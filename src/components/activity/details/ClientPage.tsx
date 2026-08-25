"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { Activity } from "@prisma/client";
import BigWaves from "@/components/home/BigWaves";
import { IoArrowBackCircle } from "react-icons/io5";
import { MdLocationOn, MdCalendarToday, MdStar, MdPeople } from "react-icons/md";
import ApplyButton from "@/components/utils/ApplyButton";
import { getApprovedApplicationsCount } from "@/lib/service/activity";

type ClientActivityDetailsProps = {
  activity: Activity;
};

export default function ClientActivityDetails({
  activity,
}: ClientActivityDetailsProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    (() => Promise<void>) | null
  >(null);
  const [approvedCount, setApprovedCount] = useState<number>(0);

  useEffect(() => {
    const fetchApprovedCount = async () => {
      try {
        const count = await getApprovedApplicationsCount(activity.id);
        setApprovedCount(count);
      } catch (error) {
        console.error("Error fetching approved count:", error);
      }
    };
    fetchApprovedCount();
  }, [activity.id]);

  const confirmApply = (onConfirm: () => Promise<void>) => {
    setShowConfirm(true);
    setPendingAction(() => onConfirm);
  };

  const handleConfirm = async () => {
    if (pendingAction) await pendingAction();
    setShowConfirm(false);
    setPendingAction(null);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setPendingAction(null);
  };

  const title = activity.title;
  const description =
    activity.description ||
    "Join this exciting student activity to develop your skills, collaborate with peers, and earn credit points.";

  const formattedDate = new Date(activity.startDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="relative z-4 select-none overflow-hidden flex px-4 sm:px-8 md:px-16 lg:px-24 gap-8 sm:gap-12 flex-col items-center justify-center min-h-[90vh] pt-0 w-full overflow-x-hidden">
      <BigWaves extraClassName="rotate-x-180" />

      <div className="relative my-24 z-10 container mx-auto px-6 lg:px-20 mt-8">
        {/* Back Navigation Button */}
        <div className="mt-4 flex justify-left w-full">
          <Link href="/activities">
            <button className="bg-[#b3caeb] text-[#1c3c86] text-2xl md:text-3xl font-extrabold px-16 py-3.5 rounded-lg shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer font-cinzel flex items-center gap-2">
              <IoArrowBackCircle /> Back
            </button>
          </Link>
        </div>
        <br />

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-16 lg:gap-24 w-full">
          {/* Left Column: Image Frame & Mascot */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
            {/* The Beige Frame */}
            <div className="relative bg-[#f4ebd0] w-[340px] h-[340px] md:w-[480px] md:h-[480px] shadow-2xl rounded-sm border-[12px] border-[#f4ebd0] z-10 flex items-center justify-center">
              <div className="bg-gray-300 w-full h-full relative overflow-hidden">
                {activity.imagePublicId ? (
                  <CldImage
                    draggable={false}
                    loading="lazy"
                    src={activity.imagePublicId}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={activity.imageUrl || "/placeholder/placeholder.png"}
                    alt={activity.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>

              {/* Mascot */}
              <div className="absolute -bottom-12 -right-16 md:-bottom-16 md:-right-24 z-20 w-[180px] h-[180px] md:w-[260px] md:h-[260px]">
                <Image
                  src="/competitions/competition-detail/veno-thinking-look_left.webp"
                  alt="Veno Mascot"
                  fill
                  className="object-contain drop-shadow-2xl hover:-translate-y-2 transition-transform duration-300"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Right Column: Title, Info, Description & Register Button */}
          <div className="flex flex-col w-full lg:w-1/2 gap-6 text-left">
            <div className="relative inline-block w-full">
              <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] tracking-wide text-white leading-tight font-cinzel">
                {title}
              </h1>

              {/* Floating Bubbles */}
              <div className="absolute -top-12 -right-0 hidden lg:block opacity-60">
                <div className="w-12 h-12 bg-white/20 rounded-full blur-[2px] absolute top-0 left-0"></div>
                <div className="w-16 h-16 bg-white/20 rounded-full blur-[2px] absolute top-8 left-12"></div>
                <div className="w-10 h-10 bg-white/20 rounded-full blur-[2px] absolute top-24 left-8"></div>
              </div>
            </div>

            {/* Retro Pixel Capsule Badges (2x2 Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
              {/* Location Badge (Red) */}
              <div className="bg-[#E85A65] border-3 border-[#8A242B] rounded-2xl p-1.5 flex items-center shadow-lg hover:scale-[1.02] transition-transform">
                <div className="w-10 sm:w-12 flex items-center justify-center shrink-0">
                  <MdLocationOn className="w-6 h-6 text-[#731E24]" />
                </div>
                <div className="bg-[#FFFDF4] rounded-xl flex-1 px-3 py-1.5 sm:py-2 flex flex-col justify-center min-w-0 border border-black/5">
                  <span className="font-pixelify uppercase font-bold text-[10px] sm:text-xs text-[#8A242B] tracking-wider leading-none">
                    Location
                  </span>
                  <span className="font-pixelify font-black text-sm sm:text-base text-[#8A242B] uppercase tracking-wide truncate mt-0.5 leading-tight">
                    {activity.location}
                  </span>
                </div>
              </div>

              {/* Start Date Badge (Purple) */}
              <div className="bg-[#9D78C9] border-3 border-[#4C2E73] rounded-2xl p-1.5 flex items-center shadow-lg hover:scale-[1.02] transition-transform">
                <div className="w-10 sm:w-12 flex items-center justify-center shrink-0">
                  <MdCalendarToday className="w-6 h-6 text-[#412466]" />
                </div>
                <div className="bg-[#FFFDF4] rounded-xl flex-1 px-3 py-1.5 sm:py-2 flex flex-col justify-center min-w-0 border border-black/5">
                  <span className="font-pixelify uppercase font-bold text-[10px] sm:text-xs text-[#4C2E73] tracking-wider leading-none">
                    Start Date
                  </span>
                  <span className="font-pixelify font-black text-sm sm:text-base text-[#4C2E73] uppercase tracking-wide truncate mt-0.5 leading-tight">
                    {formattedDate}
                  </span>
                </div>
              </div>

              {/* Credit Points Badge (Yellow) */}
              <div className="bg-[#F5D44C] border-3 border-[#947414] rounded-2xl p-1.5 flex items-center shadow-lg hover:scale-[1.02] transition-transform">
                <div className="w-10 sm:w-12 flex items-center justify-center shrink-0">
                  <MdStar className="w-6 h-6 text-[#7D600A]" />
                </div>
                <div className="bg-[#FFFDF4] rounded-xl flex-1 px-3 py-1.5 sm:py-2 flex flex-col justify-center min-w-0 border border-black/5">
                  <span className="font-pixelify uppercase font-bold text-[10px] sm:text-xs text-[#8A6A0B] tracking-wider leading-none">
                    Credit Points
                  </span>
                  <span className="font-pixelify font-black text-sm sm:text-base text-[#8A6A0B] uppercase tracking-wide truncate mt-0.5 leading-tight">
                    {activity.creditPoint} Credit Points
                  </span>
                </div>
              </div>

              {/* Availability Badge (Green) */}
              <div className="bg-[#58C673] border-3 border-[#206933] rounded-2xl p-1.5 flex items-center shadow-lg hover:scale-[1.02] transition-transform">
                <div className="w-10 sm:w-12 flex items-center justify-center shrink-0">
                  <MdPeople className="w-6 h-6 text-[#1A572B]" />
                </div>
                <div className="bg-[#FFFDF4] rounded-xl flex-1 px-3 py-1.5 sm:py-2 flex flex-col justify-center min-w-0 border border-black/5">
                  <span className="font-pixelify uppercase font-bold text-[10px] sm:text-xs text-[#206933] tracking-wider leading-none">
                    Availability
                  </span>
                  <span className="font-pixelify font-black text-sm sm:text-base text-[#206933] uppercase tracking-wide truncate mt-0.5 leading-tight">
                    {approvedCount}/{activity.quota} Players
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-2 text-base sm:text-lg md:text-xl font-medium leading-relaxed text-white/95 text-justify font-gill whitespace-pre-wrap">
              {description}
            </div>

            {/* Apply Button */}
            <div className="mt-4 pt-2">
              <ApplyButton
                activityId={activity.id}
                confirmApply={confirmApply}
                startDate={activity.startDate}
                quota={activity.quota}
                approvedCount={approvedCount}
                className="w-full sm:w-auto px-10 py-4 text-xl sm:text-2xl rounded-xl"
              >
                REGISTER NOW
              </ApplyButton>
            </div>
          </div>
        </div>
      </div>

      <BigWaves extraClassName="" />

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed z-50 inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#7E3E11] border-2 border-black rounded-2xl p-6 max-w-md w-full shadow-2xl text-center">
            <div className="bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] border-2 border-black rounded-xl p-6">
              <div className="mx-auto w-14 h-14 bg-[#BF6432] rounded-full flex items-center justify-center mb-4 border-2 border-black text-white text-2xl shadow-md">
                ✓
              </div>
              <h2 className="text-xl font-black text-[#541C16] font-cinzel mb-2 uppercase">
                Confirm Registration
              </h2>
              <p className="text-[#8C4A2F] font-cinzel font-bold text-sm leading-relaxed mb-6">
                Are you sure you want to register for{" "}
                <span className="text-[#541C16] font-black underline">
                  &quot;{activity.title}&quot;
                </span>
                ?
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2.5 bg-[#E5C198] hover:bg-[#d6af84] text-[#541C16] font-cinzel font-bold rounded-xl border-2 border-black text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2.5 bg-[#2E7D32] hover:bg-[#256629] text-white font-cinzel font-bold rounded-xl border-2 border-black text-xs sm:text-sm transition-all shadow hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Yes, Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
