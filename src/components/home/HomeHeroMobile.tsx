import Image from 'next/image'
import React from 'react'
import LinkButton from '../LinkButton'

export default function HomeHeroMobile() {
    return (
        <div className='relative bg-gradient-to-b from-[#ABC1FC] to-[#7397F6] rounded-tr-2xl rounded-br-[8rem] sm:rounded-br-[10rem] p-3 pb-6 w-[92%] max-w-md flex md:hidden justify-center items-center my-2'>
            <div className='bg-light-blue w-full flex gap-4 flex-col justify-start items-center p-4 sm:p-6 rounded-tr-xl rounded-br-[7.5rem] sm:rounded-br-[9.5rem]'>
                <div className='bg-[#300000] relative flex justify-center p-2 w-full h-[20rem] sm:h-[22rem] items-center rounded-lg overflow-hidden'>
                    <div className='relative z-1 bg-[url("/home/rcn.webp")] bg-cover bg-center w-full h-full rounded-md overflow-hidden'>
                        <div className='absolute w-full h-full bg-gradient-to-b from-[#FFFFFF]/27 via-[#4C6DB6]/80 to-[#1E4AAA]/90'></div>
                        <div className='relative w-full h-full flex flex-col justify-center items-center'>
                            <div className='relative w-[90%] h-fit flex flex-col justify-center items-center'>
                                <Image src={"/home/welcome-text.svg"} alt='welcome text' width={100} height={100} className='w-[70%] h-auto'></Image>
                                <Image src={"/home/to-su-text.svg"} alt='to su text' width={100} height={100} className='w-1/3 h-auto'></Image>
                                <Image src={"/home/your-creative-tech-text.webp"} alt='your creative tech text' width={100} height={100} className='w-1/3 absolute -top-[20%] right-0 h-auto'></Image>
                                <span className='mt-4'></span>
                                <LinkButton size='xl' href="/">{`Start >`}</LinkButton>
                            </div>
                            <Image src={"/home/veno-laptop.webp"} className='absolute z-2 bottom-4 left-1 sm:bottom-6 sm:left-4 w-24 sm:w-44 h-auto' width={100} height={100} alt='SU Veno Laptop'></Image>
                        </div>
                        <h3 className={`font-pixelify absolute bottom-2 left-4 text-xs text-white/60 z-2`}>{`v2026.2027  [ Vena Cabinet ]`}</h3>
                    </div>
                </div>
                <Image src={"/home/game-boy-elements.svg"} alt='game boy element' width={300} height={300} className='w-full h-auto mt-1'></Image>
            </div>
        </div>
    )
}
