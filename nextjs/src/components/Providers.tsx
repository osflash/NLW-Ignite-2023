import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

interface IProvidersProps {
  children: React.ReactNode
  session: Session | null
}

const Providers: React.FC<IProvidersProps> = ({ session, children }) => {
  return (
    <>
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  )
}

export default Providers
