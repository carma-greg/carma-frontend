import Banner from '@/components/banners/banner'
import Inputs from '@/components/input-display/inputs'

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="main">
        <Banner />
        <Inputs />  
    </div>
  )
}
