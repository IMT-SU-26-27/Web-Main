"use client";

import React from "react";
import Image from "next/image";
import { User } from "@/types/service/user";
import { MdEdit } from "react-icons/md";

interface StudentProfileCardProps {
  userInfo: User;
  onEditClick?: () => void;
}

export default function StudentProfileCard({
  userInfo,
  onEditClick,
}: StudentProfileCardProps) {
  return (
    <div className="w-full flex justify-center mb-10 select-none">
      {/* Wooden Board Frame matching AchievementFeatured */}
      <div className="relative z-2 bg-[#7E3E11] border-2 border-black rounded-2xl p-4 md:p-8 w-full flex justify-center items-center shadow-2xl">
        {/* Inner Parchment Panel */}
        <div className="flex flex-col z-1 bg-gradient-to-b rounded-xl border-2 border-black from-[#FFD7AB] to-[#FFE6CD] w-full min-h-full p-4 sm:p-6 md:p-8">
          {/* Top Section: Avatar & Welcome Text */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 mb-8 mt-2">
            {/* Avatar Ring */}
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 sm:border-[6px] border-[#F7DFBF] bg-[#D1D5DB] overflow-hidden flex items-center justify-center shrink-0 shadow-inner relative">
              {userInfo.image ? (
                <Image
                  src={userInfo.image}
                  alt={userInfo.name || "Student Avatar"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#CCD0D9]" />
              )}
            </div>

            {/* Welcome Text */}
            <div className="flex flex-col flex-1">
              <h2 className="font-cinzel font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#541C16] uppercase tracking-wide leading-tight">
                WELCOME BACK
              </h2>
              <h1 className="font-cinzel font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#541C16] uppercase tracking-wide leading-tight mt-1">
                {userInfo.name ? `${userInfo.name} !` : "NAME !"}
              </h1>
            </div>

            {/* Edit Profile Button */}
            {onEditClick && (
              <button
                type="button"
                onClick={onEditClick}
                title="Edit Profile"
                aria-label="Edit Profile"
                className="bg-[#BF6432] hover:bg-[#a75427] text-white p-2.5 sm:p-3 rounded-lg border-2 border-black shadow transition-all duration-200 hover:scale-105 cursor-pointer shrink-0"
              >
                <MdEdit className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>

          {/* Profile Fields List */}
          <div className="flex flex-col gap-4 sm:gap-5 w-full">
            {/* 1. Full Name */}
            <div className="w-full">
              <label className="block font-cinzel font-extrabold text-xs sm:text-sm md:text-base text-[#541C16] tracking-wide mb-1.5">
                FULL NAME
              </label>
              <div className="w-full bg-[#F5D2A4] border-2 border-black rounded-lg py-2 sm:py-2.5 px-4 font-cinzel font-bold text-xs sm:text-sm md:text-base text-[#541C16] uppercase shadow-sm truncate">
                {userInfo.name || "NAMA LENGKAP"}
              </div>
            </div>

            {/* 2. NIM (Student ID) */}
            <div className="w-full">
              <label className="block font-cinzel font-extrabold text-xs sm:text-sm md:text-base text-[#541C16] tracking-wide mb-1.5">
                NIM (STUDENT ID)
              </label>
              <div className="w-full bg-[#F5D2A4] border-2 border-black rounded-lg py-2 sm:py-2.5 px-4 font-cinzel font-bold text-xs sm:text-sm md:text-base text-[#541C16] shadow-sm truncate">
                {userInfo.nim || "070601241##"}
              </div>
            </div>

            {/* 3. Email */}
            <div className="w-full">
              <label className="block font-cinzel font-extrabold text-xs sm:text-sm md:text-base text-[#541C16] tracking-wide mb-1.5">
                EMAIL
              </label>
              <div className="w-full bg-[#F5D2A4] border-2 border-black rounded-lg py-2 sm:py-2.5 px-4 font-cinzel font-bold text-xs sm:text-sm md:text-base text-[#541C16] uppercase shadow-sm truncate">
                {userInfo.email?.toUpperCase() || "NAMA@STUDENT.CIPUTRA.AC.ID"}
              </div>
            </div>

            {/* 4. Phone Number */}
            <div className="w-full">
              <label className="block font-cinzel font-extrabold text-xs sm:text-sm md:text-base text-[#541C16] tracking-wide mb-1.5">
                PHONE NUMBER
              </label>
              <div className="w-full bg-[#F5D2A4] border-2 border-black rounded-lg py-2 sm:py-2.5 px-4 font-cinzel font-bold text-xs sm:text-sm md:text-base text-[#541C16] shadow-sm truncate">
                {userInfo.phoneNumber || "+62 ##########"}
              </div>
            </div>
          </div>
        </div>

        {/* Top-Right Horizontal Plaque Badge */}
        <div className="font-cinzel py-1 sm:py-1.5 md:py-2 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl font-bold text-white border-black text-sm sm:text-xl md:text-2xl lg:text-3xl absolute z-5 -top-3 sm:-top-4 md:-top-5 right-6 sm:right-10 md:right-16 bg-[#BF6432] border-2 shadow-md flex items-center justify-center">
          <span className="font-outline-2 sm:font-outline-4 z-1 absolute text-[#7E3E11]">
            PROFILE
          </span>
          <p className="relative z-2">PROFILE</p>
        </div>
      </div>
    </div>
  );
}
