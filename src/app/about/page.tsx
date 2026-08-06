import React from 'react'
import Image from 'next/image'
import CommunityServicesSection from '@/components/about/CommunityServicesSection'
export default function page() {
  return (
    <section className='flex flex-col justify-center items-center pt-20 pb-16 md:pt-28 md:pb-24'>
      <Image src={"/about/about-us-hero.webp"} alt='about us title' width={1000} height={1000} draggable={false} className='h-auto w-[70%]'></Image>
      <CommunityServicesSection></CommunityServicesSection>
    </section>
  )
}
