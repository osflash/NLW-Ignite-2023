import { useEffect } from 'react'

import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Header } from '~/components/Header'
import { SummaryTable } from '~/components/SummaryTable'

const Home: React.FC = () => {
  const session = useSession()
  const router = useRouter()
  const userId = session.data?.user.id

  useEffect(() => {
    if (!router.query['user'] && userId !== undefined) {
      router.push(`?user=${userId}`)
    }
  }, [router, userId])

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
