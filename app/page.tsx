// import { getServerSession } from 'next-auth'
import { authConfig } from './api/auth/[...nextauth]/options'

import Banner from '@/components/banners/banner'
import Inputs from '@/components/input-display/inputs'

import Image from 'next/image'
import Link from 'next/link'

const Home = async () => {
//   const session = await getServerSession(authConfig)
//   console.log("sesh: ",session)
  return (
      <div className="main">
          <Banner />
      </div>
  )
}

// export default async function Home() {
//   const session = await getServerSession(authConfig)
//   console.log("sesh: ",session)
//   return (
//     <>
//       {!session ? (
//         <div className="main">
//           <h1>LOGIN!!</h1>
//         </div>
//       ):(
//       <div className="main">
//           <Banner />
//       </div>
//       )}
//     </>
//   )
// }
export default Home
