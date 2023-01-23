import { useEffect, useState } from 'react'
import OneSignal from 'react-onesignal'

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

  useEffect(() => {
    const runOneSignal = async () => {
      OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONESIGNAL!,
        allowLocalhostAsSecureOrigin: true
      })

      await OneSignal.showSlidedownPrompt()

      OneSignal.isPushNotificationsEnabled(action => {
        console.log(action)
      })

      OneSignal.on('subscriptionChange', isSubscribed => {
        console.log('O estado da assinatura do usuário agora é:', isSubscribed)
      })

      OneSignal.on('permissionPromptDisplay', () => {})
    }

    runOneSignal()
  }, [])

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
