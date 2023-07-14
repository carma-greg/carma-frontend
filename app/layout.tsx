import { Plus_Jakarta_Sans } from 'next/font/google'

import '../styles/global.scss'
import Header from '@/components/header/header'

const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    display: 'swap',
  })

export const metadata = {
  title: 'Carma Earth',
  description: 'Doing good together',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jakarta.className}>
      <body>
        <Header/>
            {children}
        </body>
    </html>
  )
}
