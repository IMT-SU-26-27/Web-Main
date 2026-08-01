import React from 'react'
import Image from 'next/image'
import LinkButton from '../LinkButton'

type ChatBubbleProps = {
    title: string;
    content: string;
}

export default function ChatBubbleSection({ title, content }: ChatBubbleProps) {
    return (
        <section className='relative overflow-x-hidden w-screen pt-12 pb-32 md:pt-24 md:pb-32 flex flex-col justify-center items-center'>
            <div className='relative flex flex-col gap-6 font-bold text-lg md:text-2xl w-[90%] md:w-[60%] rounded-lg p-6 md:p-12 h-fit bg-white border-2'>
                <h3>{title}</h3>
                <h3 className=''>{content}</h3>
                <Image src={"/home/veno-waving.webp"} alt='veno wave' width={300} height={300} className='absolute -bottom-20 z-2 md:-bottom-32 -left-4 md:-left-48 w-1/4 h-auto'></Image>
                <Image src={"/home/chat-buble-tail.svg"} alt='chat tail' width={300} height={300} className='absolute -bottom-10 left-12 w-16 h-auto'></Image>
                <div className='absolute -bottom-4 right-4'>
                    <LinkButton size='md' href='/'>{`Learn More!! >`}</LinkButton>
                </div>
            </div>
        </section>
    )
}
