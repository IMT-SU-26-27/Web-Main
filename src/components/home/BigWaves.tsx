import React from 'react'
import Image from 'next/image'

export default function BigWaves() {
  return (
    <div className='relative w-screen'>
        <Image src={"/home/light-blue-cloud.svg"} alt='dark blue waves' width={300} height={300} className='w-full bottom-8 absolute h-auto'></Image>
        <Image src={"/home/dark-blue-cloud.svg"} alt='light blue waves' width={300} height={300} className='relative z-2 w-full h-auto'></Image>
    </div>
  )
}
