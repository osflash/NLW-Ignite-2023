import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { match, P } from 'ts-pattern'

import LogoImage from '~/assets/logo.svg'

import Button from '../Button'
import { NewHabit } from '../NewHabit'

export const Header: React.FC = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const userId = router.query['user']

  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <Image src={LogoImage} alt="Habits" />

      {session ? (
        session.user.id === userId ? (
          <NewHabit />
        ) : (
          <Button type="myProfile" />
        )
      ) : (
        <Button type="signIn" />
      )}
    </div>
  )
}
