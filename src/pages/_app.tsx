import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../GlobalStyles/index.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Code challenge Web site form Codeleap"
        />

        <title>Codeleap challenge</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
