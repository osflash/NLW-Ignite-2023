import { signIn } from 'next-auth/react'

import * as Dialog from '@radix-ui/react-dialog'
import { User } from 'phosphor-react'

const Auth: React.FC = () => {
  const handleCLink = async () => {
    await signIn('github', { redirect: false })
  }

  return (
    <Dialog.Root>
      <button
        type="button"
        onClick={handleCLink}
        className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background"
      >
        <User size={20} className="text-violet-500" />
        Entrar
      </button>
    </Dialog.Root>
  )
}

export default Auth
