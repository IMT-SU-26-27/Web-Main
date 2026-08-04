import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RiInstagramFill, RiTiktokFill, RiYoutubeFill } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className='bg-light-blue min-h-[20rem] p-4 w-full overflow-x-hidden flex flex-col justify-between gap-8 border-b-12 border-background'>
      <div className='flex p-6 sm:p-8 md:p-12 flex-col items-start justify-start flex-1 gap-8 md:flex-row md:justify-between md:items-start'>
        {/* Left Section: Logos & Social Media */}
        <div className='flex w-full md:w-auto flex-col gap-4'>
          <div className='flex gap-4 items-center flex-wrap'>
            <Image src={"/logos/vena-logo.webp"} alt='vena logo' width={100} height={100} className='w-auto h-10 sm:h-12'></Image>
            <Image src={"/logos/su-logo.webp"} alt='su logo' width={100} height={100} className='h-10 sm:h-12 w-auto'></Image>
            <Image src={"/logos/uc-logo.webp"} alt='uc logo' width={100} height={100} className='h-10 sm:h-12 w-auto'></Image>
          </div>
          <h3 className='font-family-glacial text-xl sm:text-2xl text-[#0A2256] font-bold'>Follow SU IMT On Social Media</h3>
          <div className='flex gap-4 text-4xl sm:text-5xl'>
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="ig-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2F5ECE" />
                  <stop offset="100%" stopColor="#182F68" />
                </linearGradient>
              </defs>
            </svg>
            <Link href={"https://www.instagram.com/uc_imtsu/"} target='_blank'><RiInstagramFill style={{ fill: 'url(#ig-gradient)' }} className='cursor-pointer hover:scale-105 transition-transform' /></Link>
            <Link href={"https://www.instagram.com/uc_imtsu/"} target='_blank'><RiTiktokFill style={{ fill: 'url(#ig-gradient)' }} className='cursor-pointer hover:scale-105 transition-transform' /></Link>
            <Link href={"https://www.instagram.com/uc_imtsu/"} target='_blank'><RiYoutubeFill style={{ fill: 'url(#ig-gradient)' }} className='cursor-pointer hover:scale-105 transition-transform' /></Link>
          </div>
        </div>

        {/* Right Section: Quick Links & Address */}
        <div className='flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-16 text-[#164098] font-family-glacial font-bold w-full md:w-auto'>
          {/* Quick Links */}
          <div className='flex flex-col gap-1 sm:gap-2'>
            <h4 className='text-xl sm:text-2xl mb-1 text-[#0A2256]'>Quick Links</h4>
            <Link href="/about" className="hover:underline text-base sm:text-lg">About</Link>
            <Link href="/events" className="hover:underline text-base sm:text-lg">Events</Link>
            <Link href="/achievements" className="hover:underline text-base sm:text-lg">Achievements</Link>
            <Link href="/activities" className="hover:underline text-base sm:text-lg">Activities</Link>
            <Link href="/competitions" className="hover:underline text-base sm:text-lg">Competitions</Link>
            <Link href="/members" className="hover:underline text-base sm:text-lg">Members</Link>
          </div>

          {/* Address */}
          <div className='flex flex-col gap-1 sm:gap-2 max-w-sm'>
            <h4 className='text-xl sm:text-2xl mb-1 text-[#0A2256]'>Address</h4>
            <p className='text-base sm:text-lg leading-snug'>
              Universitas Ciputra Surabaya, Main Building Lt. 5, CitraLand CBD Boulevard, Sambikerep, Surabaya, Jawa Timur
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <p className='w-full text-center text-[#164098] font-family-glacial font-bold text-sm sm:text-xl md:text-2xl pt-4'>
        Copyright © 2026 Informatics (IMT) Student Union Universitas Ciputra Surabaya | Kabinet Vena
      </p>
    </footer>
  )
}
