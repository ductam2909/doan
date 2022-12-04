import { Html, Head, Main, NextScript } from 'next/document'
import Script from './Script'
export default function Document () {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src='/assets/js/main.js' />
      </body>
    </Html>
  )
}
