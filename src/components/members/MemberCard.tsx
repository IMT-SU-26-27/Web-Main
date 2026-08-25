"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MemberCardProps } from "@/types/committee";

const colorList = [
    "#E0353C", // Red
    "#07A54A", // Green
    "#FFB20C", // Yellow
    "#EC6DA4", // Pink
    "#8E60A5", // Purple
    "#00BA9C", // Green Lame
];

export default function MemberCard({
    member,
    index,
    className = "",
}: MemberCardProps) {
    const accentColor = colorList[index % colorList.length];
    const [swinging, setSwinging] = useState(false);

    return (
        <div
            onMouseLeave={() => {
                setSwinging(true);
                setTimeout(() => setSwinging(false), 700); // match swing duration (in global.css ; .swing-effect)
            }}
            style={{ backgroundColor: accentColor }}
            className={`transform flex flex-col justify-between transition-all duration-300 relative w-[280px] sm:w-[300px] h-[360px] mt-4 text-left hover:rotate-[1.5deg] hover:origin-top overflow-hidden select-none shrink-0 ${
                swinging ? "swing-effect" : ""
            } ${className}`}
        >
            {/* Top Section */}
            <div className="flex-1 flex flex-col p-4 pb-2 overflow-hidden">
                {/* Photo Wrapper */}
                <div className="relative w-full h-44 sm:h-48 mb-3 overflow-hidden rounded-lg bg-black/20">
                    <Image
                        src={member.imagesrc || "/placeholder/placeholder.png"}
                        alt={member.name}
                        width={360}
                        height={200}
                        className="w-full h-full object-cover object-top"
                    />
                </div>

                {/* Member Info */}
                <div className="flex flex-col gap-4">
                    <h4 style={{ color: accentColor }} className="px-2 py-1 text-xs sm:text-sm font-family-glacial font-extrabold uppercase tracking-wider opacity-90 line-clamp-1 bg-white w-fit">
                        {member.division}
                    </h4>
                    <div className="flex flex-col gap-2">
                        <h3 className="w-full text-[#FFF5E3] text-lg sm:text-xl font-cinzel font-extrabold line-clamp-1">
                            {member.name}
                        </h3>

                        <div className="flex text-[#FFF5E3] gap-1 justify-start items-center mt-2">
                            <svg className="w-[0.7rem] h-[0.7rem]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xs font-semibold uppercase tracking-wider">{member.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
