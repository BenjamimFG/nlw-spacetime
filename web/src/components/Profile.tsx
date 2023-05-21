import Image from 'next/image'

import { getUser } from '@/services/auth.service'

export function Profile() {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt="User avatar"
        className="h-10 w-10 rounded-full"
      />

      <p className="max-w-[148px] text-sm leading-snug">
        {name}
        <a href="" className="block text-red-400 hover:text-red-300">
          Sair
        </a>
      </p>
    </div>
  )
}
