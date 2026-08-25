"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Competition } from "@/types/service/competition";

const colorList = [
  "#E0353C", // Red
  "#07A54A", // Green
  "#FFB20C", // Yellow
  "#EC6DA4", // Pink
  "#8E60A5", // Purple
  "#00BA9C", // Green Lame
];

type CompetitionCardProps = {
  competition: Competition;
  index: number;
  className?: string;
};

export const CompetitionCard = ({
  competition,
  index,
  className = "",
}: CompetitionCardProps) => {
  const accentColor = colorList[index % colorList.length];
  const [swinging, setSwinging] = useState(false);
  const pathname = usePathname();
  const description = competition.description;
  const trimmedDescription =
    description.length > 75 ? description.slice(0, 75) + "..." : description;

  return (
    <div
      onMouseLeave={() => {
        setSwinging(true);
        setTimeout(() => setSwinging(false), 700); // match swing duration (in global.css ; .swing-effect)
      }}
      style={{ backgroundColor: accentColor }}
      className={`transform flex flex-col justify-between transition-all duration-300 relative w-full max-w-[320px] sm:w-[320px] h-[460px] mt-8 text-left hover:rotate-[1.5deg] hover:origin-top overflow-hidden ${
        swinging ? "swing-effect" : ""
      } ${className}`}
    >
      {/* Top clickable area leading to competition detail */}
      <Link
        href={`${pathname.replace(/\/$/, "")}/${competition.id}`}
        className="flex-1 flex flex-col p-4 pb-2 overflow-hidden"
      >
        <div className="relative w-full h-40 sm:h-44 mb-2 overflow-hidden rounded-lg">
          <Image
            src={competition.imageUrl || "/placeholder/placeholder.png"}
            alt={competition.name}
            width={360}
            height={144}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Content */}
        <div className="flex flex-col">
          <h4 className="text-white text-xs sm:text-sm font-family-glacial font-extrabold uppercase tracking-wider opacity-90 line-clamp-1">
            {competition.organizer}
          </h4>
          <h3 className="w-full text-[#FFF5E3] text-lg sm:text-xl font-cinzel font-extrabold line-clamp-1">
            {competition.name}
          </h3>

          {/* Category, Type & Level */}
          <div className="flex text-[#FFF5E3] gap-1 justify-start items-center mt-1">
            <svg className="w-[0.6rem] h-[0.6rem]" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-[0.8rem] capitalize">
              {competition.category} • {competition.type.toLowerCase()} • {competition.level.toLowerCase()}
            </p>
          </div>

          {/* Start & End Dates */}
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
              {new Date(competition.startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(competition.endDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Description */}
          <p className="w-full mt-2 font-gill text-[12px] text-[#FFF5E3] line-clamp-2">
            {trimmedDescription}
          </p>
        </div>
      </Link>

      {/* Register Button docked directly at the bottom edge */}
      <div className="w-full mt-auto">
        <Link
          href="https://bit.ly/compucimt"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden transition-all duration-300 flex items-center justify-center text-center font-cinzel font-bold py-3 px-4 w-full text-[#FFF5E3] bg-black/40 hover:bg-black/50"
        >
          {/* Sliding color overlay from left on hover */}
          <span
            className="absolute inset-0 bg-black/30 transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 pointer-events-none"
            aria-hidden="true"
          />
          <span className="relative z-10 text-base sm:text-lg">Register</span>
        </Link>
      </div>
    </div>
  );
};
