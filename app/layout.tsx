import { Plus_Jakarta_Sans } from 'next/font/google';
import { ApolloWrapper } from "./ApolloWrapper";
import { AuthProvider } from "./state";


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


const RootLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <html lang="en" className={jakarta.className}>
            <body>
                <AuthProvider>
                    <Header/>
                    <ApolloWrapper>{children}</ApolloWrapper>
                </AuthProvider>
            </body>
        </html>
    )
}

export default RootLayout
