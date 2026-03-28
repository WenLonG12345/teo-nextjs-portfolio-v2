---
title: "Building Type-Safe APIs with ConnectRPC: Go Backend + React Frontend"
date: "2025-03-27"
description: "A practical guide to using ConnectRPC to build fully type-safe APIs with a Golang backend and React frontend — covering protobuf definitions, code generation, and React Query hooks."
tags: ["Golang", "React", "ConnectRPC", "TypeScript", "Protobuf"]
coverImage: "/images/connectrpc-golang-react.png"
---

## Table of Contents

- [Why ConnectRPC?](#why-connectrpc)
- [Use Case: Note-Taking API](#use-case-note-taking-api)
- [Project Folder Structure](#project-folder-structure)
- [Step 1: Define the Proto](#step-1-define-the-proto)
- [Understanding idempotency_level](#understanding-idempotency_level)
- [Step 2: Generate Code with Buf](#step-2-generate-code-with-buf)
- [Step 3: Go Backend](#step-3-go-backend)
- [Step 4: React Frontend](#step-4-react-frontend)
- [Bonus: Protobuf Timestamp Conversion](#bonus-protobuf-timestamp-conversion)
- [Error Handling](#error-handling)
- [Conclusion](#conclusion)

---

## Why ConnectRPC?

While learning how to connect a Go backend with a React frontend, I evaluated a few options — REST, tRPC, plain gRPC — before settling on ConnectRPC. I needed something:

- **Type-safe end-to-end** — no hand-written API clients that drift from the server
- **Browser-compatible** — unlike plain gRPC, which requires an Envoy proxy for browsers
- **Works with `curl` and `fetch`** — unlike binary-only gRPC

[ConnectRPC](https://connectrpc.com/) solves all three. A single `.proto` file generates a Go server interface, a TypeScript client, and optional React Query hooks — all in sync.

---

## Use Case: Note-Taking API

We'll walk through a concrete example: **a simple authenticated note-taking app**. The flow is:

1. User logs in and receives an access token
2. User creates, lists, updates, and deletes notes (all authenticated)
3. List supports pagination via a page token

This covers all four CRUD operations, authenticated requests, and paginated queries — a representative slice of what you'd build in a real app.

---

## Project Folder Structure

```
my-app/
├── proto/                               # Shared protobuf definitions
│   ├── buf.yaml
│   ├── buf.gen.yaml
│   ├── auth/v1/
│   │   └── auth.proto
│   ├── note/v1/
│   │   └── note.proto
│   └── gen/                             # Auto-generated (never edit by hand)
│       ├── go/
│       │   └── note/v1/
│       │       ├── note.pb.go
│       │       └── notev1connect/
│       │           └── note.connect.go
│       └── ts/
│           └── notes/                   # Published as @your-org/note-proto workspace package
│               ├── package.json
│               └── note/v1/
│                   ├── note_pb.ts
│                   └── note-NoteService_connectquery.ts
│
├── backend/                             # Go server
│   ├── go.mod                           # replace directive points to proto/gen/go
│   ├── cmd/server/
│   │   ├── main.go
│   │   └── middleware.go
│   └── note/
│       ├── handler.go
│       └── service.go
│
├── frontend/                            # React app (Vite or Next.js)
│   ├── package.json                     # "@your-org/note-proto": "workspace:*"
│   └── src/
│       ├── lib/
│       │   └── transport.ts
│       └── hooks/
│           └── useNotes.ts
│
└── pnpm-workspace.yaml                  # lists proto/gen/ts/notes as a workspace package
```

The `proto/` folder is the single source of truth. Generated code lives in `proto/gen/` — not inside each app. Both the Go backend and the React frontend consume the generated code as proper packages.

**Go — `go.mod` replace directive:**

```go
// backend/go.mod
module github.com/your-org/my-app/backend

require (
    github.com/your-org/my-app/proto/gen/go/notes v0.0.0
)

// Point to the local generated code instead of a published module
replace github.com/your-org/my-app/proto/gen/go/notes => ../proto/gen/go/notes
```

**TypeScript — pnpm workspace:**

```yaml
# pnpm-workspace.yaml
packages:
  - "frontend"
  - "proto/gen/ts/notes"   # treat generated TS as a local workspace package
```

```json
// proto/gen/ts/notes/package.json
{
  "name": "@your-org/note-proto",
  "exports": {
    "./*": { "types": "./*.ts", "default": "./*" }
  }
}
```

```json
// frontend/package.json  (excerpt)
{
  "dependencies": {
    "@your-org/note-proto": "workspace:*"
  }
}
```

This way `import { listNotes } from "@your-org/note-proto/note/v1/..."` works in the frontend with full TypeScript types, and `go build` resolves the generated Go module locally — no publishing required.

---

## Step 1: Define the Proto

Two services: `AuthService` (public) and `NoteService` (protected).

```protobuf
// proto/auth/v1/auth.proto
syntax = "proto3";
package notes.auth.v1;

service AuthService {
  rpc Login(LoginRequest) returns (LoginResponse) {
    option idempotency_level = IDEMPOTENCY_UNKNOWN;
  }
}

message LoginRequest {
  string email    = 1;
  string password = 2;
}

message LoginResponse {
  string access_token = 1;
}
```

```protobuf
// proto/note/v1/note.proto
syntax = "proto3";
package notes.note.v1;

import "google/protobuf/timestamp.proto";

service NoteService {
  rpc Create(CreateNoteRequest) returns (CreateNoteResponse) {
    option idempotency_level = IDEMPOTENCY_UNKNOWN;
  }

  rpc List(ListNotesRequest) returns (ListNotesResponse) {
    option idempotency_level = NO_SIDE_EFFECTS;
  }

  rpc Update(UpdateNoteRequest) returns (UpdateNoteResponse) {
    option idempotency_level = IDEMPOTENT;
  }

  rpc Delete(DeleteNoteRequest) returns (DeleteNoteResponse) {
    option idempotency_level = IDEMPOTENT;
  }
}

message Note {
  string                    id         = 1;
  string                    title      = 2;
  string                    content    = 3;
  google.protobuf.Timestamp created_at = 4;
  google.protobuf.Timestamp updated_at = 5;
}

message CreateNoteRequest {
  string title   = 1;
  string content = 2;
}

message CreateNoteResponse {
  Note note = 1;
}

message ListNotesRequest {
  optional int32  page_size  = 1;
  optional string page_token = 2;
}

message ListNotesResponse {
  repeated Note notes          = 1;
  string        next_page_token = 2;
}

message UpdateNoteRequest {
  string id      = 1;
  string title   = 2;
  string content = 3;
}

message UpdateNoteResponse {
  Note note = 1;
}

message DeleteNoteRequest {
  string id = 1;
}

message DeleteNoteResponse {}
```

Note `created_at` and `updated_at` use `google.protobuf.Timestamp` — a protobuf well-known type. We'll cover how to convert it on the frontend [below](#bonus-protobuf-timestamp-conversion).

---

## Understanding idempotency_level

You may have noticed the `option idempotency_level` annotation on each RPC. This is a proto option that tells ConnectRPC (and the generated clients) how an RPC behaves with respect to side effects:

| Value | HTTP method | Meaning |
|---|---|---|
| `IDEMPOTENCY_UNKNOWN` | POST | Default. Use for mutations — the server may change state on each call |
| `NO_SIDE_EFFECTS` | GET | Read-only. Safe to retry and cache. ConnectRPC will use HTTP GET automatically |
| `IDEMPOTENT` | POST | Safe to retry (calling twice produces the same result), but may have side effects |

In our example:

- `AuthService.Login` and `NoteService.Create` are mutations → `IDEMPOTENCY_UNKNOWN` → POST
- `NoteService.List` is a pure read → `NO_SIDE_EFFECTS` → GET (cacheable)
- `NoteService.Update` and `NoteService.Delete` are safe to retry → `IDEMPOTENT` → POST

The GET behaviour matters because browsers and CDNs can cache GET responses. Set `useHttpGet: true` on your authed transport and your `List` calls become cache-eligible for free:

```typescript
export function createAuthedTransport(baseUrl: string, bearerToken: string) {
    return createConnectTransport({
        baseUrl,
        useHttpGet: true,   // List RPC → GET → cacheable
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

    authconnect "github.com/your-org/my-app/proto/gen/go/auth/v1/authv1connect"
    noteconnect "github.com/your-org/my-app/proto/gen/go/note/v1/notev1connect"
    "github.com/your-org/my-app/backend/note"
)

func run() error {
    mux := http.NewServeMux()

    // Auth middleware wraps protected routes
    authMW := authn.NewMiddleware(authenticate(queries))

    // Public: no auth required
    mux.Handle(authconnect.NewAuthServiceHandler(newAuthServer()))

    // Protected: requires valid Bearer token
    path, handler := noteconnect.NewNoteServiceHandler(
        note.NewHandler(noteService),
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

        user, err := queries.ValidateToken(ctx, token)
        if err != nil {
            return nil, authn.Errorf("invalid token: %v", err)
        }

        return User{ID: user.ID}, nil
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

Handlers implement the generated interface. The full CRUD:

```go
// backend/note/handler.go
package note

import (
    "connectrpc.com/authn"
    "connectrpc.com/connect"
    "google.golang.org/protobuf/types/known/timestamppb"

    notev1 "github.com/your-org/my-app/proto/gen/go/note/v1"
)

type Handler struct{ svc *Service }

func NewHandler(svc *Service) *Handler { return &Handler{svc: svc} }

func (h *Handler) Create(
    ctx context.Context,
    req *connect.Request[notev1.CreateNoteRequest],
) (*connect.Response[notev1.CreateNoteResponse], error) {
    user, ok := authn.GetInfo(ctx).(User)
    if !ok {
        return nil, connect.NewError(connect.CodeUnauthenticated, errors.New("invalid session"))
    }
    if req.Msg.GetTitle() == "" {
        return nil, connect.NewError(connect.CodeInvalidArgument, errors.New("title is required"))
    }

    n, err := h.svc.Create(ctx, user.ID, req.Msg.GetTitle(), req.Msg.GetContent())
    if err != nil {
        return nil, connect.NewError(connect.CodeInternal, err)
    }

    return connect.NewResponse(&notev1.CreateNoteResponse{Note: toProto(n)}), nil
}

func (h *Handler) List(
    ctx context.Context,
    req *connect.Request[notev1.ListNotesRequest],
) (*connect.Response[notev1.ListNotesResponse], error) {
    user, ok := authn.GetInfo(ctx).(User)
    if !ok {
        return nil, connect.NewError(connect.CodeUnauthenticated, errors.New("invalid session"))
    }

    notes, nextToken, err := h.svc.List(ctx, user.ID, req.Msg.PageToken)
    if err != nil {
        return nil, connect.NewError(connect.CodeInternal, err)
    }

    protoNotes := make([]*notev1.Note, len(notes))
    for i, n := range notes {
        protoNotes[i] = toProto(n)
    }

    return connect.NewResponse(&notev1.ListNotesResponse{
        Notes:         protoNotes,
        NextPageToken: nextToken,
    }), nil
}

func (h *Handler) Update(
    ctx context.Context,
    req *connect.Request[notev1.UpdateNoteRequest],
) (*connect.Response[notev1.UpdateNoteResponse], error) {
    user, ok := authn.GetInfo(ctx).(User)
    if !ok {
        return nil, connect.NewError(connect.CodeUnauthenticated, errors.New("invalid session"))
    }

    n, err := h.svc.Update(ctx, user.ID, req.Msg.GetId(), req.Msg.GetTitle(), req.Msg.GetContent())
    if err != nil {
        return nil, connect.NewError(connect.CodeInternal, err)
    }

    return connect.NewResponse(&notev1.UpdateNoteResponse{Note: toProto(n)}), nil
}

func (h *Handler) Delete(
    ctx context.Context,
    req *connect.Request[notev1.DeleteNoteRequest],
) (*connect.Response[notev1.DeleteNoteResponse], error) {
    user, ok := authn.GetInfo(ctx).(User)
    if !ok {
        return nil, connect.NewError(connect.CodeUnauthenticated, errors.New("invalid session"))
    }

    if err := h.svc.Delete(ctx, user.ID, req.Msg.GetId()); err != nil {
        return nil, connect.NewError(connect.CodeInternal, err)
    }

    return connect.NewResponse(&notev1.DeleteNoteResponse{}), nil
}

func toProto(n *Note) *notev1.Note {
    return &notev1.Note{
        Id:        n.ID,
        Title:     n.Title,
        Content:   n.Content,
        CreatedAt: timestamppb.New(n.CreatedAt),
        UpdatedAt: timestamppb.New(n.UpdatedAt),
    }
}
```

---

## Step 4: React Frontend

### Transport Setup

Create two transports — one bare (for public endpoints), one with an injected `Authorization` header (for protected endpoints):

```typescript
// frontend/src/lib/transport.ts
import type { Message } from "@bufbuild/protobuf";
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { AuthService } from "@your-org/note-proto/auth/v1/auth_pb";

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

// ── Type Utils ───────────────────────────────────────────────────────────────

export type Plain<T> = Omit<T, keyof Message<string>>;

// ── Timestamp Conversion ─────────────────────────────────────────────────────
// (see next section)
```

### Notes Hook

Use `useQuery` for listing notes and `useMutation` for create, update, and delete. The generated `*_connectquery.ts` file exports descriptors that these hooks understand directly:

```typescript
// frontend/src/hooks/useNotes.ts
import { useMutation, useQuery } from "@connectrpc/connect-query";
import {
    createNote,
    deleteNote,
    listNotes,
    updateNote,
} from "@your-org/note-proto/note/v1/note-NoteService_connectquery";
import { createAuthedTransport } from "@/lib/transport";

export function useNotes(apiBaseUrl: string, accessToken: string | null) {
    const transport = accessToken
        ? createAuthedTransport(apiBaseUrl, accessToken)
        : undefined;

    // useQuery fetches the list automatically and re-fetches when accessToken changes.
    // Because List has idempotency_level = NO_SIDE_EFFECTS, ConnectRPC sends it as
    // an HTTP GET — making the response eligible for browser and CDN caching.
    const { data, isLoading } = useQuery(
        listNotes,
        {},
        { transport, enabled: !!accessToken },
    );

    const { mutateAsync: create, isPending: isCreating } = useMutation(createNote, { transport });
    const { mutateAsync: update, isPending: isUpdating } = useMutation(updateNote, { transport });
    const { mutateAsync: remove, isPending: isDeleting } = useMutation(deleteNote, { transport });

    return {
        notes: data?.notes ?? [],
        nextPageToken: data?.nextPageToken,
        isLoading,
        create,    // (input: CreateNoteRequest) => Promise<CreateNoteResponse>
        update,    // (input: UpdateNoteRequest) => Promise<UpdateNoteResponse>
        remove,    // (input: DeleteNoteRequest) => Promise<DeleteNoteResponse>
        isCreating,
        isUpdating,
        isDeleting,
    };
}
```

Usage in a component:

```typescript
function NotesPage({ apiBaseUrl, accessToken }: { apiBaseUrl: string; accessToken: string }) {
    const { notes, isLoading, create, update, remove } = useNotes(apiBaseUrl, accessToken);

    if (isLoading) return <p>Loading...</p>;

    return (
        <ul>
            {notes.map((note) => (
                <li key={note.id}>
                    <strong>{note.title}</strong>
                    <button onClick={() => update({ id: note.id, title: "Updated", content: note.content })}>
                        Edit
                    </button>
                    <button onClick={() => remove({ id: note.id })}>Delete</button>
                </li>
            ))}
        </ul>
    );
}
```

Key advantages over manual `fetch`:

- **No cancelled-fetch bookkeeping** — React Query handles stale requests automatically
- **Automatic caching** — calling the hook from two components doesn't fire two network requests
- **`enabled` flag** — the query waits until the token is available without any `if (!x) return` guards

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
 * fromTimestamp(note.createdAt)           // "2025-03-27 14:30:00"
 * fromTimestamp(note.createdAt, "MMM D")  // "Mar 27"
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
function toNote(n: Note) {
    return {
        id: n.id,
        title: n.title,
        content: n.content,
        createdAt: fromTimestamp(n.createdAt, "MMM D, YYYY"),  // e.g. "Mar 27, 2025"
        updatedAt: fromTimestamp(n.updatedAt, "HH:mm"),         // e.g. "14:30"
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
return nil, connect.NewError(connect.CodeNotFound,
    errors.New("note not found"))
```

**TypeScript (client):**
```typescript
import { ConnectError, Code } from "@connectrpc/connect";

try {
    await create({ title, content });
} catch (err) {
    if (err instanceof ConnectError) {
        switch (err.code) {
            case Code.Unauthenticated:
                // redirect to login
                break;
            case Code.InvalidArgument:
                // show validation error
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

In this note-taking API example, a single `.proto` file gave us:

- A **Go server interface** that the compiler enforces — rename a field and every unupdated call site becomes a compile error
- **TypeScript message types and React Query hooks** via `protoc-gen-connect-query` — no more guessing at response shapes or writing fetch wrappers
- **Automatic GET for idempotent reads** (`List`) via `idempotency_level = NO_SIDE_EFFECTS`, enabling browser and CDN caching with no extra code
- **Bearer token injection** as a one-line interceptor, shared across all authenticated RPCs
- **Typed error codes** that map cleanly from Go's `connect.NewError` to TypeScript's `ConnectError` and HTTP statuses

The monorepo workspace pattern — `proto/gen/go` consumed via a `go.mod` `replace` directive, `proto/gen/ts/notes` consumed via `pnpm workspace:*` — keeps generated code co-located with the `.proto` source while making it importable as a real package from both the backend and the frontend.
