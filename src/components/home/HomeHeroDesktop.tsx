'use client'

import Image from 'next/image'
import React, { useRef, useState } from 'react'
import LinkButton from '@/components/LinkButton'
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md'

export default function HomeHeroDesktop() {
    const [isMuted, setIsMuted] = useState(true)
    const iframeRef = useRef<HTMLIFrameElement>(null)

    const toggleAudio = () => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            if (isMuted) {
                iframeRef.current.contentWindow.postMessage(
                    JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
                    '*'
                )
                iframeRef.current.contentWindow.postMessage(
                    JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }),
                    '*'
                )
                setIsMuted(false)
            } else {
                iframeRef.current.contentWindow.postMessage(
                    JSON.stringify({ event: 'command', func: 'mute', args: [] }),
                    '*'
                )
                setIsMuted(true)
            }
        }
    }

    return (
        <div className='relative rotate-z-1 hidden md:flex w-[90%] h-full border-[#7296F6] border-b-24 border-r-24 rounded-4xl'>
            <div className='absolute min-w-full min-h-full bg-[#7296F6] z-0 rounded-tl-4xl rounded-tr-lg'></div>
            <div className='relative w-full flex justify-center items-center'>
                <div className='bg-light-blue flex justify-center items-center min-h-full sm:p-2 lg:p-4 rounded-bl-4xl rounded-tl-4xl'>
                    <Image draggable={false} src={"/home/left-side.webp"} className='-rotate-z-1 sm:w-[80%] lg:w-full h-auto' alt='left psp' width={300} height={300}></Image>
                </div>
                <div className="bg-[#300000] relative flex justify-center p-8 w-full h-full items-center">
                    <div className='relative z-1 w-full h-full overflow-hidden'>
                        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
                            <iframe
                                ref={iframeRef}
                                className="absolute top-1/2 left-1/2 w-[160%] h-[160%] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
                                src="https://www.youtube-nocookie.com/embed/AqAFkRRcGNc?autoplay=1&mute=1&loop=1&playlist=AqAFkRRcGNc&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&disablekb=1"
                                title="Hero Background Video"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </div>
                        <div className='absolute inset-0 w-full h-full bg-gradient-to-b from-[#FFFFFF]/27 via-[#4C6DB6]/80 to-[#1E4AAA]/90 z-1 pointer-events-none'></div>
                        <div className='relative z-2 w-full h-full flex flex-col justify-center items-center'>
                            <div className='relative w-[90%] h-fit flex flex-col justify-center items-center'>
                                <Image draggable={false} src={"/home/welcome-text.svg"} alt='welcome text' width={100} height={100} className='sm:w-[80%] lg:w-1/2 h-auto'></Image>
                                <Image draggable={false} src={"/home/to-su-text.svg"} alt='to su text' width={100} height={100} className='sm:w-[70%] lg:w-1/3 h-auto'></Image>
                                <Image draggable={false} src={"/home/your-creative-tech-text.webp"} alt='your creative tech text' width={100} height={100} className='sm:w-1/2 lg:w-1/4 absolute sm:-top-[25%] lg:-top-[35%] right-0 h-auto'></Image>
                                <span className='mt-8'></span>
                                <LinkButton size='xl' href="/">{`Start >`}</LinkButton>
                            </div>
                            <Image draggable={false} src={"/home/veno-laptop.webp"} className='absolute z-2 bottom-8 sm:left-0 lg:left-18 sm:w-32 lg:w-64 h-auto' width={100} height={100} alt='SU Veno Laptop'></Image>
                        </div>
                        <h3 className={`font-pixelify absolute bottom-2 left-4 text-xl text-white/60 z-2`}>{`v2026.2027  [ Vena Cabinet ]`}</h3>
                        <button
                            type="button"
                            onClick={toggleAudio}
                            className="absolute bottom-2.5 right-4 z-10 flex items-center gap-1.5 px-3 py-1 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white/90 rounded-full text-xs font-medium border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                            title={isMuted ? "Unmute sound" : "Mute sound"}
                        >
                            {isMuted ? (
                                <>
                                    <MdVolumeOff className="text-sm text-red-400" />
                                    <span>Unmute Sound</span>
                                </>
                            ) : (
                                <>
                                    <MdVolumeUp className="text-sm text-emerald-400 animate-pulse" />
                                    <span>Sound On</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
                <div className='bg-light-blue min-h-full sm:p-1 lg:p-4 flex justify-center items-center rounded-br-4xl rounded-tr-4xl'>
                    <Image draggable={false} src={"/home/right-side.webp"} className='-rotate-z-1 sm:w-[80%] lg:w-full h-auto' alt='right psp' width={300} height={300}></Image>
                </div>
            </div>
        </div>
    )
}
