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
                <div className="relative bg-[#300000] flex justify-center p-4 w-[48rem] items-center">
                    <div className='w-full h-full relative'>
                        <div className='absolute w-full h-full bg-gradient-to-b from-[#FFFFFF]/27 via-[#4C6DB6]/80 to-[#1E4AAA]/90'></div>
                        <div className='relative z-1 opacity-50 bg-[url("/home/rcn.webp")] bg-cover bg-center w-full h-full'></div>
                        <Image src={"/home/veno-laptop.webp"} className='absolute z-2 bottom-8 left-18' width={100} height={100} alt='SU Veno Laptop'></Image>
                        <h3 className={`font-pixelify text-4xl`}>abwiajwokaowk</h3>
                    </div>
                </div>
                <div className='bg-light-blue min-h-full p-2 rounded-br-4xl rounded-tr-4xl'>
                    <Image src={"/home/right-side.webp"} className='-rotate-z-1 w-full h-auto' alt='right psp' width={100} height={100}></Image>
                </div>
            </div>
        </div>
    )
}
