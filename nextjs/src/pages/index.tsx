import { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Header } from '~/components/Header'
import { SummaryTable } from '~/components/SummaryTable'

const Home: React.FC = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const user = session?.user.id
  const queryUser = router.query['user']

  useEffect(() => {
    if (!user || !router.isReady || queryUser) return

    router.push(`?user=${user}`)
  }, [queryUser, router, user])

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}

export default Home
