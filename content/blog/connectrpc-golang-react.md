---
title: "Building Type-Safe APIs with ConnectRPC: Go Backend + React Frontend"
date: "2025-03-27"
description: "A practical guide to using ConnectRPC to build fully type-safe APIs with a Golang backend and React frontend — with real production patterns from the Revocall AI voice agent platform."
tags: ["Golang", "React", "ConnectRPC", "TypeScript", "Protobuf"]
coverImage: "/images/connectrpc-golang-react.png"
---

## Table of Contents

- [Why ConnectRPC?](#why-connectrpc)
- [Use Case: Conversation API](#use-case-conversation-api)
- [Project Folder Structure](#project-folder-structure)
- [Step 1: Define the Proto](#step-1-define-the-proto)
- [Understanding idempotency_level](#understanding-idempotency_level)
- [Step 2: Generate Code with Buf](#step-2-generate-code-with-buf)
- [Step 3: Go Backend](#step-3-go-backend)
- [Step 4: React Frontend](#step-4-react-frontend)
- [Bonus: Protobuf Timestamp Conversion](#bonus-protobuf-timestamp-conversion)
- [Error Handling](#error-handling)
- [Key Takeaways](#key-takeaways)
- [Conclusion](#conclusion)

---

## Why ConnectRPC?

At [Revolab](https://www.revolab.com/), building the Revocall AI voice agent platform meant choosing a communication layer between Go microservices and a React frontend. We needed something:

- **Type-safe end-to-end** — no hand-written API clients that drift from the server
- **Browser-compatible** — unlike plain gRPC, which requires an Envoy proxy for browsers
- **Works with `curl` and `fetch`** — unlike binary-only gRPC

[ConnectRPC](https://connectrpc.com/) solves all three. A single `.proto` file generates a Go server interface, a TypeScript client, and optional React Query hooks — all in sync.

---

## Use Case: Conversation API

We'll walk through a real scenario from Revocall: **creating and fetching a conversation** with an AI voice agent. The flow is:

1. Client authenticates and gets an access token
2. Client creates a conversation (passing a `bot_id`)
3. Server returns a conversation token + conversation ID
4. Client fetches conversation history with pagination

This covers mutations, authenticated requests, and paginated queries — everything you'd encounter in a real app.

---

## Project Folder Structure

```
my-app/
├── proto/                               # Shared protobuf definitions
│   ├── buf.yaml
│   ├── buf.gen.yaml
│   ├── auth/v1/
│   │   └── auth.proto
│   ├── conversation/v1/
│   │   └── conversation.proto
│   └── gen/                             # Auto-generated (never edit by hand)
│       ├── go/
│       │   └── conversation/v1/
│       │       ├── conversation.pb.go
│       │       └── conversationv1connect/
│       │           └── conversation.connect.go
│       └── ts/
│           └── chat/                    # Published as @your-org/chat-proto workspace package
│               ├── package.json
│               └── conversation/v1/
│                   ├── conversation_pb.ts
│                   └── conversation-ConversationService_connectquery.ts
│
├── backend/                             # Go server
│   ├── go.mod                           # replace directive points to proto/gen/go
│   ├── cmd/server/
│   │   ├── main.go
│   │   └── middleware.go
│   └── conversation/
│       ├── handler.go
│       └── service.go
│
├── frontend/                            # React app (Vite or Next.js)
│   ├── package.json                     # "@your-org/chat-proto": "workspace:*"
│   └── src/
│       ├── lib/
│       │   └── transport.ts
│       └── hooks/
│           └── useConversation.ts
│
└── pnpm-workspace.yaml                  # lists proto/gen/ts/chat as a workspace package
```

The `proto/` folder is the single source of truth. Generated code lives in `proto/gen/` — not inside each app. Both the Go backend and the React frontend consume the generated code as proper packages.

**Go — `go.mod` replace directive:**

```go
// backend/go.mod
module github.com/your-org/my-app/backend

require (
    github.com/your-org/my-app/proto/gen/go/chat v0.0.0
)

// Point to the local generated code instead of a published module
replace github.com/your-org/my-app/proto/gen/go/chat => ../proto/gen/go/chat
```

**TypeScript — pnpm workspace:**

```yaml
# pnpm-workspace.yaml
packages:
  - "frontend"
  - "proto/gen/ts/chat"   # treat generated TS as a local workspace package
```

```json
// proto/gen/ts/chat/package.json
{
  "name": "@your-org/chat-proto",
  "exports": {
    "./*": { "types": "./*.ts", "default": "./*" }
  }
}
```

```json
// frontend/package.json  (excerpt)
{
  "dependencies": {
    "@your-org/chat-proto": "workspace:*"
  }
}
```

This way `import { create } from "@your-org/chat-proto/conversation/v1/..."` works in the frontend with full TypeScript types, and `go build` resolves the generated Go module locally — no publishing required.

---

## Step 1: Define the Proto

Two services for our use case: `AuthService` (public) and `ConversationService` (protected).

```protobuf
// proto/auth/v1/auth.proto
syntax = "proto3";
package chat.auth.v1;

service AuthService {
  rpc Init(InitRequest) returns (InitResponse) {
    option idempotency_level = IDEMPOTENCY_UNKNOWN;
  }
}

message InitRequest {
  string organization_id = 1;
}

message InitResponse {
  string access_token = 1;
}
```

```protobuf
// proto/conversation/v1/conversation.proto
syntax = "proto3";
package chat.conversation.v1;

import "google/protobuf/timestamp.proto";

service ConversationService {
  rpc Create(CreateRequest) returns (CreateResponse) {
    option idempotency_level = IDEMPOTENCY_UNKNOWN;
  }

  rpc History(HistoryRequest) returns (HistoryResponse) {
    option idempotency_level = NO_SIDE_EFFECTS;
  }
}

message CreateRequest {
  string bot_id = 1;
}

message CreateResponse {
  string access_token    = 1;
  string conversation_id = 2;
}

message HistoryRequest {
  string          conversation_id  = 1;
  optional int32  limit            = 2;
  optional string pagination_token = 3;
}

message HistoryResponse {
  message Message {
    string                    conversation_id = 1;
    int64                     id              = 2;
    string                    content         = 3;
    string                    sender          = 4;
    google.protobuf.Timestamp created_at      = 5;
  }

  repeated Message messages = 1;
  string           next     = 2;
}
```

Note `created_at` uses `google.protobuf.Timestamp` — a protobuf well-known type. We'll cover how to convert it on the frontend [below](#bonus-protobuf-timestamp-conversion).

---

## Understanding idempotency_level

You may have noticed the `option idempotency_level` annotation on each RPC. This is a proto option that tells ConnectRPC (and the generated clients) how an RPC behaves with respect to side effects:

| Value | HTTP method | Meaning |
|---|---|---|
| `IDEMPOTENCY_UNKNOWN` | POST | Default. Use for mutations — the server may change state on each call |
| `NO_SIDE_EFFECTS` | GET | Read-only. Safe to retry and cache. ConnectRPC will use HTTP GET automatically |
| `IDEMPOTENT` | POST | Safe to retry (calling twice produces the same result), but may have side effects |

In our example:

- `AuthService.Init` and `ConversationService.Create` are mutations → `IDEMPOTENCY_UNKNOWN` → ConnectRPC sends them as POST
- `ConversationService.History` is a pure read → `NO_SIDE_EFFECTS` → ConnectRPC sends it as GET when `useHttpGet: true` is set in the transport

The GET behaviour matters because browsers and CDNs can cache GET responses. Set `useHttpGet: true` on your authed transport and your `History` calls become cache-eligible for free:

```typescript
export function createAuthedTransport(baseUrl: string, bearerToken: string) {
    return createConnectTransport({
        baseUrl,
        useHttpGet: true,   // History RPC → GET → cacheable
        interceptors: [ ... ],
    });
}
```

---

## Step 2: Generate Code with Buf

Install [buf](https://buf.build/) and the required plugins:

```bash
brew install bufbuild/buf/buf
go install connectrpc.com/connect/cmd/protoc-gen-connect-go@latest
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
npm install -g @bufbuild/protoc-gen-es @connectrpc/protoc-gen-connect-query
```

Configure `proto/buf.gen.yaml`:

```yaml
version: v2
managed:
  enabled: true
  override:
    - file_option: go_package_prefix
      value: github.com/your-org/my-app/proto/gen/go
plugins:
  # Go: message structs
  - local: protoc-gen-go
    out: gen/go
    opt: paths=source_relative

  # Go: ConnectRPC service interfaces + handlers
  - local: protoc-gen-connect-go
    out: gen/go
    opt:
      - paths=source_relative
      - package_suffix

  # TypeScript: message classes (ESM)
  - local: protoc-gen-es
    out: gen/ts
    opt: target=ts

  # TypeScript: React Query hooks per RPC
  - local: protoc-gen-connect-query
    out: gen/ts
    opt: target=ts
```

Then run:

```bash
cd proto && buf generate
```

This produces everything in `gen/` — Go server stubs and TypeScript clients both derived from the same `.proto` source.

---

## Step 3: Go Backend

### Register Routes

The generated code gives you a path constant and a handler constructor. Register them on your mux:

```go
// backend/cmd/server/main.go
package main

import (
    "net/http"

    "connectrpc.com/authn"
    "golang.org/x/net/http2"
    "golang.org/x/net/http2/h2c"

    authconnect       "github.com/your-org/my-app/proto/gen/go/auth/v1/authv1connect"
    conversationconn  "github.com/your-org/my-app/proto/gen/go/conversation/v1/conversationv1connect"
    "github.com/your-org/my-app/backend/conversation"
)

func run() error {
    mux := http.NewServeMux()

    // Auth middleware wraps protected routes
    authMW := authn.NewMiddleware(authenticate(queries))

    // Public: no auth required
    mux.Handle(authconnect.NewAuthServiceHandler(newAuthServer()))

    // Protected: requires valid Bearer token
    path, handler := conversationconn.NewConversationServiceHandler(
        conversation.NewHandler(conversationService),
    )
    mux.Handle(path, authMW.Wrap(handler))

    // h2c = HTTP/2 over cleartext (needed for Connect protocol)
    srv := &http.Server{
        Addr:    ":8080",
        Handler: h2c.NewHandler(corsMiddleware(mux), &http2.Server{}),
    }
    return srv.ListenAndServe()
}
```

### Auth Middleware

`connectrpc.com/authn` makes token validation clean. Return any value from `AuthFunc` — it will be available in every handler via `authn.GetInfo(ctx)`:

```go
// backend/cmd/server/middleware.go
func authenticate(queries Queries) authn.AuthFunc {
    return func(ctx context.Context, req *http.Request) (any, error) {
        token := req.Header.Get("Authorization")
        if !strings.HasPrefix(token, "Bearer ") {
            return nil, authn.Errorf("missing Bearer token")
        }
        token = strings.TrimPrefix(token, "Bearer ")

        session, err := queries.ValidateToken(ctx, token)
        if err != nil {
            return nil, authn.Errorf("invalid token: %v", err)
        }

        return Participant{
            ID:             session.UserID,
            OrganizationID: session.OrganizationID,
        }, nil
    }
}

func corsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if origin := r.Header.Get("Origin"); origin != "" {
            w.Header().Set("Access-Control-Allow-Origin", origin)
            w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            w.Header().Set("Access-Control-Allow-Headers",
                "Content-Type, Connect-Protocol-Version, Connect-Timeout-Ms, Authorization")
            w.Header().Set("Access-Control-Allow-Credentials", "true")
        }
        if r.Method == http.MethodOptions {
            w.WriteHeader(http.StatusNoContent)
            return
        }
        next.ServeHTTP(w, r)
    })
}
```

### Implement the Handler

Handlers implement the generated interface. Key types: `connect.Request[T]` wraps your proto request, `connect.Response[T]` wraps the response, and `connect.NewError(code, err)` gives typed errors:

```go
// backend/conversation/handler.go
package conversation

import (
    "connectrpc.com/authn"
    "connectrpc.com/connect"

    conversationv1 "github.com/your-org/my-app/proto/gen/go/conversation/v1"
)

type Handler struct{ svc *Service }

func NewHandler(svc *Service) *Handler { return &Handler{svc: svc} }

func (h *Handler) Create(
    ctx context.Context,
    req *connect.Request[conversationv1.CreateRequest],
) (*connect.Response[conversationv1.CreateResponse], error) {

    participant, ok := authn.GetInfo(ctx).(Participant)
    if !ok {
        return nil, connect.NewError(connect.CodeUnauthenticated,
            errors.New("invalid session"))
    }

    if req.Msg.GetBotId() == "" {
        return nil, connect.NewError(connect.CodeInvalidArgument,
            errors.New("bot_id is required"))
    }

    token, conv, err := h.svc.Create(ctx, participant.OrganizationID, req.Msg.GetBotId())
    if err != nil {
        return nil, connect.NewError(connect.CodeInternal, err)
    }

    return connect.NewResponse(&conversationv1.CreateResponse{
        AccessToken:    token,
        ConversationId: conv.ID,
    }), nil
}

func (h *Handler) History(
    ctx context.Context,
    req *connect.Request[conversationv1.HistoryRequest],
) (*connect.Response[conversationv1.HistoryResponse], error) {

    participant, ok := authn.GetInfo(ctx).(Participant)
    if !ok {
        return nil, connect.NewError(connect.CodeUnauthenticated,
            errors.New("invalid session"))
    }

    // Authorization: only participants can fetch history
    ok, err := h.svc.IsParticipant(ctx, req.Msg.ConversationId, participant.ID)
    if err != nil {
        return nil, connect.NewError(connect.CodeInternal, err)
    }
    if !ok {
        return nil, connect.NewError(connect.CodePermissionDenied,
            errors.New("not a participant in this conversation"))
    }

    messages, next, err := h.svc.History(ctx, req.Msg.ConversationId, req.Msg.PaginationToken)
    if err != nil {
        return nil, connect.NewError(connect.CodeInternal, err)
    }

    protoMessages := make([]*conversationv1.HistoryResponse_Message, len(messages))
    for i, m := range messages {
        protoMessages[i] = &conversationv1.HistoryResponse_Message{
            ConversationId: m.ConversationID,
            Id:             m.ID,
            Content:        m.Content,
            Sender:         m.Sender,
            CreatedAt:      timestamppb.New(m.CreatedAt),
        }
    }

    return connect.NewResponse(&conversationv1.HistoryResponse{
        Messages: protoMessages,
        Next:     next,
    }), nil
}
```

---

## Step 4: React Frontend

### Transport Setup

Create two transports — one bare (for public endpoints), one with an injected `Authorization` header (for protected endpoints). Typed clients are created from the generated service definitions:

```typescript
// frontend/src/lib/transport.ts
import type { Message } from "@bufbuild/protobuf";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import dayjs from "dayjs";

import { AuthService } from "@/gen/ts/auth/v1/auth_pb";
import { ConversationService } from "@/gen/ts/conversation/v1/conversation_pb";

// ── Transports ──────────────────────────────────────────────────────────────

export function createBaseTransport(baseUrl: string) {
    return createConnectTransport({ baseUrl });
}

export function createAuthedTransport(baseUrl: string, bearerToken: string) {
    return createConnectTransport({
        baseUrl,
        useHttpGet: true, // Enables GET for idempotent RPCs → browser caching
        interceptors: [
            (next) => (req) => {
                req.header.set("Authorization", `Bearer ${bearerToken}`);
                return next(req);
            },
        ],
    });
}

// ── Typed Clients ────────────────────────────────────────────────────────────

export const createAuthClient = (baseUrl: string) =>
    createClient(AuthService, createBaseTransport(baseUrl));

export const createConversationClient = (baseUrl: string, token: string) =>
    createClient(ConversationService, createAuthedTransport(baseUrl, token));

// ── Type Utils ───────────────────────────────────────────────────────────────

/**
 * Strip protobuf Message internals so you can spread the object safely.
 * Useful when passing proto messages as plain props/state.
 */
export type Plain<T> = Omit<T, keyof Message<string>>;

// ── Timestamp Conversion ─────────────────────────────────────────────────────
// (see next section)
```

### Conversation Hook

Instead of managing loading and error state by hand, use `useMutation` from `@connectrpc/connect-query`. The generated `*_connectquery.ts` file exports a `create` descriptor that `useMutation` understands directly:

```typescript
// frontend/src/hooks/useConversation.ts
import { useMutation } from "@connectrpc/connect-query";
import { useState } from "react";
import { create } from "@your-org/chat-proto/conversation/v1/conversation-ConversationService_connectquery";
import { createAuthClient, createAuthedTransport } from "@/lib/transport";

export function useConversation(apiBaseUrl: string, botId: string) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [conversationId, setConversationId] = useState<string | null>(null);

    // useMutation wraps the Create RPC — isPending and error are managed automatically
    const { mutateAsync, isPending, error } = useMutation(create, {
        transport: createAuthedTransport(apiBaseUrl, accessToken ?? ""),
    });

    const connect = async (organizationId: string) => {
        // Step 1: get anonymous access token via public endpoint (direct call)
        const { accessToken: token } = await createAuthClient(apiBaseUrl).init({ organizationId });
        setAccessToken(token);

        // Step 2: create conversation — useMutation tracks isPending + error state
        const authedTransport = createAuthedTransport(apiBaseUrl, token);
        const res = await mutateAsync({ botId }, { transport: authedTransport } as any);
        setConversationId(res.conversationId);

        return { conversationToken: res.accessToken, conversationId: res.conversationId };
    };

    return { connect, accessToken, conversationId, isConnecting: isPending, error };
}
```

### Fetching History with useQuery

`useQuery` replaces the `useEffect` + manual loading state. Pass `enabled` so the query only runs once both `conversationId` and `accessToken` are available:

```typescript
// frontend/src/hooks/useConversationHistory.ts
import { useQuery } from "@connectrpc/connect-query";
import { history } from "@your-org/chat-proto/conversation/v1/conversation-ConversationService_connectquery";
import type { HistoryResponse_Message } from "@your-org/chat-proto/conversation/v1/conversation_pb";
import { createAuthedTransport, fromTimestamp } from "@/lib/transport";

interface Message {
    id: string;
    content: string;
    sender: string;
    createdAt: string;
}

export function useConversationHistory(
    apiBaseUrl: string,
    accessToken: string | null,
    conversationId: string | null,
) {
    const transport = accessToken
        ? createAuthedTransport(apiBaseUrl, accessToken)
        : undefined;

    // useQuery handles caching, deduplication, and background refetch automatically.
    // Because History has idempotency_level = NO_SIDE_EFFECTS, ConnectRPC sends it
    // as an HTTP GET — making the response eligible for browser and CDN caching.
    const { data, isLoading, error } = useQuery(
        history,
        { conversationId: conversationId ?? "" },
        {
            transport,
            enabled: !!conversationId && !!accessToken,
        },
    );

    return {
        messages: data?.messages.map(toMessage) ?? [],
        nextToken: data?.next,
        isLoading,
        error,
    };
}

function toMessage(m: HistoryResponse_Message): Message {
    return {
        id: String(m.id),
        content: m.content,
        sender: m.sender,
        createdAt: fromTimestamp(m.createdAt, "HH:mm"),
    };
}
```

Key advantages over the manual `useEffect` approach:

- **No cancelled-fetch bookkeeping** — React Query handles stale requests automatically
- **Automatic caching** — calling the hook from two components doesn't fire two network requests
- **`enabled` flag** — the query waits until both IDs are available without any `if (!x) return` guards

---

## Bonus: Protobuf Timestamp Conversion

Protobuf's `google.protobuf.Timestamp` has `seconds` (int64) and `nanos` (int32) fields. Neither is directly usable as a JS `Date`. Add a `fromTimestamp` utility to your `transport.ts`:

```typescript
// frontend/src/lib/transport.ts  (add to the bottom)
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import dayjs from "dayjs";

/**
 * Convert a protobuf Timestamp to a formatted date string.
 *
 * Timestamp.seconds is a BigInt in the JS runtime, so we cast it with Number()
 * before arithmetic. Nanos are divided by 1_000_000 to get milliseconds.
 *
 * @example
 * fromTimestamp(message.createdAt)           // "2025-03-27 14:30:00"
 * fromTimestamp(message.createdAt, "MMM D")  // "Mar 27"
 */
export function fromTimestamp(
    ts?: Timestamp,
    format = "YYYY-MM-DD HH:mm:ss",
): string {
    if (!ts) return "";
    const millis = Number(ts.seconds) * 1000 + Math.floor(ts.nanos / 1_000_000);
    return dayjs(millis).format(format);
}
```

Use it when mapping proto messages to your UI types:

```typescript
function toMessage(m: HistoryResponse_Message): Message {
    return {
        id: String(m.id),
        content: m.content,
        sender: m.sender,
        createdAt: fromTimestamp(m.createdAt, "HH:mm"),   // e.g. "14:30"
    };
}
```

The `Number(ts.seconds)` cast is important — protobuf `int64` fields arrive as `BigInt` in the browser, and `BigInt * 1000` would throw without the explicit conversion.

---

## Error Handling

ConnectRPC maps typed error codes to HTTP statuses automatically. Use the right code on the server, and `ConnectError` on the client:

| Connect Code | HTTP | When to use |
|---|---|---|
| `CodeInvalidArgument` | 400 | Bad request payload |
| `CodeUnauthenticated` | 401 | Missing / invalid token |
| `CodePermissionDenied` | 403 | Valid token, not authorized |
| `CodeNotFound` | 404 | Resource doesn't exist |
| `CodeInternal` | 500 | Unexpected server error |

**Go (server):**
```go
return nil, connect.NewError(connect.CodePermissionDenied,
    errors.New("not a participant in this conversation"))
```

**TypeScript (client):**
```typescript
import { ConnectError, Code } from "@connectrpc/connect";

try {
    await client.create({ botId });
} catch (err) {
    if (err instanceof ConnectError) {
        switch (err.code) {
            case Code.Unauthenticated:
                // redirect to login
                break;
            case Code.PermissionDenied:
                // show access denied
                break;
            default:
                console.error(err.message);
        }
    }
}
```

---

## Conclusion

ConnectRPC sits at a sweet spot: you get the type-safety and schema-enforcement of gRPC without the browser-incompatibility, and you get HTTP/JSON compatibility without hand-written API clients.

In the Revocall conversation API, a single `.proto` file gave us:

- A **Go server interface** that the compiler enforces — rename a field and every unupdated call site becomes a compile error
- **TypeScript message types and React Query hooks** via `protoc-gen-connect-query` — no more guessing at response shapes or writing fetch wrappers
- **Automatic GET for idempotent reads** (`History`) via `idempotency_level = NO_SIDE_EFFECTS`, enabling browser and CDN caching with no extra code
- **Bearer token injection** as a one-line interceptor, shared across all authenticated RPCs
- **Typed error codes** that map cleanly from Go's `connect.NewError` to TypeScript's `ConnectError` and HTTP statuses

The monorepo workspace pattern — `proto/gen/go` consumed via a `go.mod` `replace` directive, `proto/gen/ts/chat` consumed via `pnpm workspace:*` — keeps generated code co-located with the `.proto` source while making it importable as a real package from both the backend and the frontend.

If you're building a Go backend with a React frontend, ConnectRPC is worth evaluating. The upfront cost is a `buf.gen.yaml` and a few minutes of toolchain setup. The payoff is end-to-end type safety that scales as your API grows.
