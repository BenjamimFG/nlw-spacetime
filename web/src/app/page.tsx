import { cookies } from 'next/headers'

import { Copyright } from '@/components/Copyright'
import { EmptyMemoryTimeline } from '@/components/EmptyMemoryTimeline'
import { HeroSection } from '@/components/HeroSection'
import { SignUp } from '@/components/SignUp'
import { Profile } from '@/components/Profile'

export default function Home() {
  const isAuthenticated = cookies().has('jwt')

  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* Left Panel */}
      <section className="relative flex flex-col items-start justify-between overflow-hidden border-white/10 bg-[url(../assets/stars.svg)] bg-cover px-28 py-16">
        {/* Blur background */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full"></div>
        {/* Stripes */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes"></div>

        {isAuthenticated ? <Profile /> : <SignUp />}

        <HeroSection />

        <Copyright />
      </section>

      {/* Right Panel */}
      <section className="flex flex-col bg-[url(../assets/stars.svg)] bg-cover p-16">
        <EmptyMemoryTimeline />
      </section>
    </main>
  )
}
