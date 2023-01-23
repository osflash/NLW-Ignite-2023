import '~/styles/globals.css'
import '~/lib/dayjs'

import { Session } from 'next-auth'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

import Providers from '~/components/Providers'

interface MyAppProps extends AppProps {
  session: Session
}

const App: React.FC<MyAppProps> = ({ Component, pageProps, session }) => {
  return (
    <>
      <Head>
        <title>NLW 2023</title>
        <meta name="application-name" content="Habit - NLW Ignite 2023" />
        <meta name="description" content="NLW 2023" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#4c1d95" />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <Script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" />
      <Providers session={session}>
        <Component {...pageProps} />
      </Providers>
    </>
  )
}

export default App
