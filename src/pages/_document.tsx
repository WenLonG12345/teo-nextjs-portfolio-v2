import { Html, Head, Main, NextScript } from 'next/document'
import { createGetInitialProps } from "@mantine/next";

export default function NextDocument() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

NextDocument.getInitialProps = createGetInitialProps();