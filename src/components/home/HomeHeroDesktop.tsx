import Image from 'next/image'
import React from 'react'
import LinkButton from '@/components/LinkButton'
export default function HomeHeroDesktop() {
    return (
        <div className='relative rotate-z-1 hidden md:flex w-[90%] h-full border-[#7296F6] border-b-24 border-r-24 rounded-4xl'>
            <div className='absolute min-w-full min-h-full bg-[#7296F6] z-0 rounded-tl-4xl rounded-tr-lg'></div>
            <div className='relative w-full flex'>
                <div className='bg-light-blue min-h-full p-4 rounded-bl-4xl rounded-tl-4xl'>
                    <Image src={"/home/left-side.webp"} className='-rotate-z-1 w-full h-auto' alt='left psp' width={300} height={300}></Image>
                </div>
                <div className="bg-[#300000] relative flex justify-center p-8 w-full h-full items-center">
                    <div className='relative z-1 bg-[url("/home/rcn.webp")] bg-cover bg-center w-full h-full'>
                        <div className='absolute w-full h-full bg-gradient-to-b from-[#FFFFFF]/27 via-[#4C6DB6]/80 to-[#1E4AAA]/90'></div>
                        <div className='relative w-full h-full flex flex-col justify-center items-center'>
                            <div className='relative w-[90%] h-fit flex flex-col justify-center items-center'>
                                <Image src={"/home/welcome-text.svg"} alt='welcome text' width={100} height={100} className='w-1/2 h-auto'></Image>
                                <Image src={"/home/to-su-text.svg"} alt='to su text' width={100} height={100} className='w-1/3 h-auto'></Image>
                                <Image src={"/home/your-creative-tech-text.webp"} alt='your creative tech text' width={100} height={100} className='w-1/4 absolute -top-[35%] right-0 h-auto'></Image>
                                <span className='mt-8'></span>
                                <LinkButton size='xl' href="/">{`Start >`}</LinkButton>
                            </div>
                            <Image src={"/home/veno-laptop.webp"} className='absolute z-2 bottom-8 left-18 md:w-64 h-auto' width={100} height={100} alt='SU Veno Laptop'></Image>
                        </div>
                        <h3 className={`font-pixelify absolute bottom-2 left-4 text-xl text-white/60 z-2`}>{`v2026.2027  [ Vena Cabinet ]`}</h3>
                    </div>
                </div>
                <div className='bg-light-blue min-h-full p-4 rounded-br-4xl rounded-tr-4xl'>
                    <Image src={"/home/right-side.webp"} className='-rotate-z-1 w-full h-auto' alt='right psp' width={300} height={300}></Image>
                </div>
            </div>
        </div>
    )
}
