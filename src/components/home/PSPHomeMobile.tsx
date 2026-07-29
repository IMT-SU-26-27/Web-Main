import Image from 'next/image'
import React from 'react'

export default function PSPHomeMobile() {
    return (
        <div className='relative rotate-z-90 mt-12 flex md:hidden h-fit w-fit border-[#7296F6] border-r-14 rounded-4xl'>
            <div className='absolute min-w-full min-h-full bg-[#7296F6] z-0 rounded-tl-4xl rounded-tr-2xl rounded-bl-4xl rounded-br-2xl'></div>
            <div className='relative flex'>
                <div className='bg-light-blue min-h-full p-2 rounded-bl-4xl rounded-tl-4xl'>
                    <Image src={"/home/left-side.webp"} className='-rotate-z-1 w-full h-auto' alt='left psp' width={100} height={100}></Image>
                </div>
                <div className="bg-[#300000] flex justify-center p-4 w-[48rem] items-center">
                   <div className='bg-white w-full h-full'></div>
                </div>
                <div className='bg-light-blue min-h-full p-2 rounded-br-4xl rounded-tr-4xl'>
                    <Image src={"/home/right-side.webp"} className='-rotate-z-1 w-full h-auto' alt='right psp' width={100} height={100}></Image>
                </div>
            </div>
        </div>
    )
}
