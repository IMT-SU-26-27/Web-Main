"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { AchievementItemCardProps } from "@/types/service/achievement";
import Link from "next/link";

const colorList = [
  "#E0353C", // Red
  "#07A54A", // Green
  "#FFB20C", // Yellow
  "#EC6DA4", // Pink
  "#8E60A5", // Purple
  "#00BA9C", // Green Lame
];

export default function AchievementItemCard({
  achievement,
  index,
  className = "",
}: AchievementItemCardProps) {
  const accentColor = colorList[index % colorList.length];
  const [swinging, setSwinging] = useState(false);
  const imageSrc = achievement.imagePublicId || achievement.imageUrl;

  const description = achievement.description;
  const trimmedDescription =
    description.length > 90 ? description.slice(0, 90) + "..." : description;

  return (
    <Link
      href={`/achievements/${achievement.id}`}
      onMouseLeave={() => {
        setSwinging(true);
        setTimeout(() => setSwinging(false), 700); // match swing duration (in global.css ; .swing-effect)
      }}
      style={{ backgroundColor: accentColor }}
      className={`transform flex flex-col justify-between transition-all duration-300 relative w-full max-w-[320px] sm:w-[320px] h-[460px] mt-8 text-left hover:rotate-[1.5deg] hover:origin-top overflow-hidden select-none cursor-pointer ${
        swinging ? "swing-effect" : ""
      } ${className}`}
    >
      {/* Top section */}
      <div className="flex-1 flex flex-col p-4 pb-2 overflow-hidden">
        {/* Photo Wrapper */}
        <div className="relative w-full h-40 sm:h-44 mb-2 overflow-hidden rounded-lg bg-black/20">
          {achievement.imagePublicId ? (
            <CldImage
              draggable={false}
              loading="lazy"
              src={achievement.imagePublicId}
              alt={achievement.title}
              fill
              className="w-full h-full object-cover"
            />
          ) : imageSrc ? (
            <Image
              src={imageSrc}
              alt={achievement.title}
              width={360}
              height={144}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black/20">
              <span className="text-[#FFF5E3]/60 font-cinzel text-xs uppercase tracking-wider">
                No Image Available
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="flex flex-col">
          <h4 className="text-white text-xs sm:text-sm font-family-glacial font-extrabold uppercase tracking-wider opacity-90 line-clamp-1">
            {achievement.teamInfo}
          </h4>
          <h3 className="w-full text-[#FFF5E3] text-lg sm:text-xl font-cinzel font-extrabold line-clamp-1">
            {achievement.title}
          </h3>

          {/* Date Meta */}
          <div className="flex gap-1 text-[#FFF5E3] justify-start items-center mt-1">
            <svg
              className="w-[0.6rem] h-[0.6rem]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-[0.8rem]">
              {new Date(achievement.createdAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Description */}
          <p className="w-full mt-2 font-gill text-[12px] text-[#FFF5E3] line-clamp-3 leading-snug">
            {trimmedDescription}
          </p>
        </div>
      </div>

      {/* Bottom docked bar with left-to-right swipe animation */}
      <div className="w-full mt-auto">
        <div className="group relative overflow-hidden transition-all duration-300 flex items-center justify-center text-center font-cinzel font-bold py-3 px-4 w-full text-[#FFF5E3] bg-black/40 group-hover:bg-black/50">
          <span
            className="absolute inset-0 bg-black/30 transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 pointer-events-none"
            aria-hidden="true"
          />
          <span className="relative z-10 text-sm sm:text-base tracking-widest uppercase">
            SEE DETAILS
          </span>
        </div>
      </div>
    </Link>
  );
}
