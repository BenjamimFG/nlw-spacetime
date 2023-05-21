import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

import { EmptyMemoryTimeline } from '@/components/EmptyMemoryTimeline'
import { api } from '@/services/api.service'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

dayjs.locale(ptBR)

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('jwt')

  if (!isAuthenticated) return <EmptyMemoryTimeline />

  const jwt = cookies().get('jwt')?.value
  const res = await api.get('/memories', {
    headers: { Authorization: `Bearer ${jwt}` },
  })

  const memories: Memory[] = res.data

  if (memories.length === 0) return <EmptyMemoryTimeline />

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
            <Image
              src={memory.coverUrl}
              alt="Memory cover image"
              width={592}
              height={280}
              className="aspect-video w-full rounded-lg object-cover"
            />
            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>
            <Link
              href={`/memories/${memory.id}`}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            >
              Ler mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
