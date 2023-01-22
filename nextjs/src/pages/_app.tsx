import '~/styles/globals.css'
import '~/lib/dayjs'

import { Session } from 'next-auth'
import type { AppProps } from 'next/app'

import Providers from '~/components/Providers'

interface MyAppProps extends AppProps {
  session: Session
}

const App: React.FC<MyAppProps> = ({ Component, pageProps, session }) => {
  return (
    <Providers session={session}>
      <Component {...pageProps} />
    </Providers>
  )
}

export default App
