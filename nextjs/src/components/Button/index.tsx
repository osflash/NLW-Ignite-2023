import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

import { User } from 'phosphor-react'

interface ButtonProps {
  type: 'signIn' | 'myProfile'
}

const Button: React.FC<ButtonProps> = ({ type }) => {
  const router = useRouter()

  const handleCLink = async () => {
    if (type === 'signIn') {
      await signIn('github', { redirect: false })
    } else {
      await router.push('/')
    }
  }

  return (
    <button
      type="button"
      onClick={handleCLink}
      className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background"
    >
      <User size={20} className="text-violet-500" />
      {type === 'signIn' ? 'Entrar' : 'Meu Perfil'}
    </button>
  )
}

export default Button
