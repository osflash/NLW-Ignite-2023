import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { match, P } from 'ts-pattern'

import LogoImage from '~/assets/logo.svg'

import Auth from '../Auth'
import { NewHabit } from '../NewHabit'

export const Header: React.FC = () => {
  const { data } = useSession()
  const router = useRouter()
  const userId = router.query['user']

  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <Image src={LogoImage} alt="Habits" />

      {data ? data.user.id === userId ? <NewHabit /> : null : <Auth />}
    </div>
  )
}
