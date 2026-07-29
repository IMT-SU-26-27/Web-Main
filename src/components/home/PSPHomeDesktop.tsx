import Image from 'next/image'
import React from 'react'

export default function PSPHomeDesktop() {
    return (
        <div className='relative hidden md:flex h-fit w-fit border-[#7296F6] border-b-24 border-r-24 rounded-4xl'>
            <div className='absolute min-w-full min-h-full bg-[#7296F6] z-0 rounded-tl-4xl rounded-tr-lg'></div>
            <div className='relative flex'>
                <div className='bg-light-blue min-h-full p-4 rounded-bl-4xl rounded-tl-4xl'>
                    <Image src={"/home/left-side.webp"} className='-rotate-z-1' alt='left psp' width={200} height={200}></Image>
                </div>
                <div className="bg-[#300000] flex justify-center p-8 w-fit items-center">
                    <Image src={"/home/hero-image.webp"} className="-rotate-z-[1deg]" width={1000} height={1000} alt="hero image"></Image>
                </div>
                <div className='bg-light-blue min-h-full p-4 rounded-br-4xl rounded-tr-4xl'>
                    <Image src={"/home/right-side.webp"} className='-rotate-z-1' alt='right psp' width={200} height={200}></Image>
                </div>
            </div>
        </div>
    )
}
