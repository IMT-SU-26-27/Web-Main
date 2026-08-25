'use client'

import Image from 'next/image'
import React, { useRef, useState } from 'react'
import LinkButton from '../LinkButton'
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md'

export default function HomeHeroMobile() {
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
        <div className='relative bg-gradient-to-b from-[#ABC1FC] to-[#7397F6] rounded-tr-2xl rounded-br-[8rem] sm:rounded-br-[10rem] p-3 pb-6 w-[92%] max-w-md flex md:hidden justify-center items-center my-2'>
            <div className='bg-light-blue w-full flex gap-4 flex-col justify-start items-center p-4 sm:p-6 rounded-tr-xl rounded-br-[7.5rem] sm:rounded-br-[9.5rem]'>
                <div className='bg-[#300000] relative flex justify-center p-2 w-full h-[20rem] sm:h-[22rem] items-center rounded-lg overflow-hidden'>
                    <div className='relative z-1 w-full h-full rounded-md overflow-hidden'>
                        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
                            <iframe
                                ref={iframeRef}
                                className="absolute top-1/2 left-1/2 w-[220%] h-[220%] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
                                src="https://www.youtube-nocookie.com/embed/AqAFkRRcGNc?autoplay=1&mute=1&loop=1&playlist=AqAFkRRcGNc&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&disablekb=1"
                                title="Hero Background Video"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </div>
                        <div className='absolute inset-0 w-full h-full bg-gradient-to-b from-[#FFFFFF]/27 via-[#4C6DB6]/80 to-[#1E4AAA]/90 z-1 pointer-events-none'></div>
                        <div className='relative z-2 w-full h-full flex flex-col justify-center items-center'>
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
                        <button
                            type="button"
                            onClick={toggleAudio}
                            className="absolute bottom-2 right-2 z-10 flex items-center gap-1 px-2.5 py-0.5 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white/90 rounded-full text-[10px] font-medium border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                            title={isMuted ? "Unmute sound" : "Mute sound"}
                        >
                            {isMuted ? (
                                <>
                                    <MdVolumeOff className="text-xs text-red-400" />
                                    <span>Unmute</span>
                                </>
                            ) : (
                                <>
                                    <MdVolumeUp className="text-xs text-emerald-400 animate-pulse" />
                                    <span>Sound On</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
                <Image src={"/home/game-boy-elements.svg"} alt='game boy element' width={300} height={300} className='w-full h-auto mt-1'></Image>
            </div>
        </div>
    )
}
