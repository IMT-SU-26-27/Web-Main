"use client";

import React from "react";
import LinkButton from "@/components/LinkButton";
import TLInfoPanelDecorative from "@/components/TLInfoPanelDecorative";
import BigWaves from "@/components/home/BigWaves";
import { MdMailOutline } from "react-icons/md";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center relative z-10 overflow-x-hidden">
      <BigWaves extraClassName="rotate-x-180" />

      {/* Main Wooden Board Frame */}
      <div className="relative z-2 bg-[#7E3E11] border-2 border-black rounded-2xl p-4 sm:p-6 md:p-8 w-[92%] sm:w-[85%] md:w-[70%] max-w-xl flex justify-center items-center shadow-2xl my-8">
        {/* Inner Parchment Card */}
        <div className="flex flex-col justify-center items-center z-1 bg-gradient-to-b rounded-xl border-2 border-black from-[#FFD7AB] to-[#FFE6CD] w-full p-6 sm:p-10 text-center">
          {/* Email / Auth Warning Icon Emblem */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#7E3E11] border-2 border-black rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-md transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <MdMailOutline className="w-9 h-9 sm:w-12 sm:h-12 text-[#FFD7AB]" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cinzel text-[#7E3E11] tracking-wide uppercase">
            Access Denied
          </h1>

          {/* Subtitle */}
          <h3 className="text-sm sm:text-base md:text-lg text-[#543737] font-pixelify mt-2">
            UC Domain Verification Required
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base font-gill text-[#543737] mt-4 leading-relaxed max-w-md">
            Authentication failed! You must use a valid{" "}
            <span className="font-bold underline text-[#7E3E11]">
              @ciputra.ac.id
            </span>{" "}
            email account to sign in and enter this realm.
          </p>
        </div>

        {/* Bottom Action Button */}
        <LinkButton
          size="xl"
          extraClass="absolute -bottom-4 sm:-bottom-5 z-5 shadow-lg"
          href="/"
        >
          Try Again
        </LinkButton>

        {/* Top-Left Decorative Ribbon Badge */}
        <TLInfoPanelDecorative>AUTH ERROR</TLInfoPanelDecorative>
      </div>

      <BigWaves extraClassName="" />
    </div>
  );
}
