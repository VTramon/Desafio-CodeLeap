import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import '../GlobalStyles/index.scss'
import { store } from '../redux/app/store'

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
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
