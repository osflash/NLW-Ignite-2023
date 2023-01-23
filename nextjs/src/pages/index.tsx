import { useEffect } from 'react'

import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Header } from '~/components/Header'
import { SummaryTable } from '~/components/SummaryTable'

const Home: React.FC = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const user = session?.user.id
  const queryUser = router.query['user']

  // http://localhost:3000/?user=cld8icsth0000mf0913bc2gtu

  useEffect(() => {
    if (!user || !router.isReady || queryUser) return

    router.push(`?user=${user}`)
  }, [queryUser, router, user])

  return (
    <>
      <Head>
        <title>NLW 2023</title>
        <meta name="description" content="NLW 2023" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
          <Header />
          <SummaryTable />
        </div>
      </div>
    </>
  )
}

export default Home
