import '../styles/global.scss'
import Header from '@/components/header'

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
    <html lang="en">
      <body>
        <Header/>
            {children}
        </body>
    </html>
  )
}
