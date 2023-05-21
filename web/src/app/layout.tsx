import './globals.css'
import { ReactNode } from 'react'
import {
  Roboto_Flex as RobotoFlex,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

import { Copyright } from '@/components/Copyright'
import { HeroSection } from '@/components/HeroSection'
import { Profile } from '@/components/Profile'
import { SignUp } from '@/components/SignUp'
import { cookies } from 'next/headers'

const roboto = RobotoFlex({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construída com React, Tailwind e Typescript durante o evento NLW Spacetime.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('jwt')

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
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
          <section className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/stars.svg)] bg-cover">
            {children}
          </section>
        </main>
      </body>
    </html>
  )
}
