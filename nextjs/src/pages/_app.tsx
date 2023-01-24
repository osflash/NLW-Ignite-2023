import '~/styles/globals.css'
import '~/lib/dayjs'

import { Session } from 'next-auth'
import type { AppProps } from 'next/app'
import Head from 'next/head'

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
        <link rel="apple-touch-icon" href="/android-chrome-512x512.png" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Habit" />
        <meta
          property="og:description"
          content="About
O Habits é um aplicativo que ajuda os usuários a registrar e acompanhar suas metas e resoluções diariamente. Ele permite que os usuários adicionem metas e resoluções desejadas, registrem sua realização diariamente e acompanhem sua evolução através de gráficos ao longo do tempo."
        />
        <meta property="og:site_name" content="Habit - NLW Ignite 2023" />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/apple-touch-icon.png" />
      </Head>

      <Providers session={session}>
        <Component {...pageProps} />
      </Providers>
    </>
  )
}

export default App
