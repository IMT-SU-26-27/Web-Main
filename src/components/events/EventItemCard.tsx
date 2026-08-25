"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Event } from "@/types/service/event";

const colorList = [
  "#E0353C", // Red
  "#07A54A", // Green
  "#FFB20C", // Yellow
  "#EC6DA4", // Pink
  "#8E60A5", // Purple
  "#00BA9C", // Green Lame
];

type EventItemCardProps = {
  event: Event;
  index: number;
  className?: string;
};

export const EventItemCard = ({
  event,
  index,
  className = "",
}: EventItemCardProps) => {
  const accentColor = colorList[index % colorList.length];
  const [swinging, setSwinging] = useState(false);
  const description = event.description;
  const trimmedDescription =
    description.length > 75 ? description.slice(0, 75) + "..." : description;

  const startDateFormatted = new Date(event.startDate).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const endDateFormatted = new Date(event.endDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      onMouseLeave={() => {
        setSwinging(true);
        setTimeout(() => setSwinging(false), 700);
      }}
      style={{ backgroundColor: accentColor }}
      className={`transform flex flex-col justify-between transition-all duration-300 relative w-full max-w-[320px] sm:w-[320px] h-[460px] mt-8 text-left hover:rotate-[1.5deg] hover:origin-top overflow-hidden ${
        swinging ? "swing-effect" : ""
      } ${className}`}
    >
      {/* Top clickable area leading to event detail */}
      <Link
        href={`/events/${event.id}`}
        className="flex-1 flex flex-col p-4 pb-2 overflow-hidden"
      >
        <div className="relative w-full h-40 sm:h-44 mb-2 overflow-hidden rounded-lg">
          <Image
            src={event.imageUrl || "/placeholder/placeholder.png"}
            alt={event.name}
            width={360}
            height={144}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Content */}
        <div className="flex flex-col">
          {/* Status Badge */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`inline-block px-2 py-0.5 rounded text-[10px] font-cinzel font-black uppercase tracking-wider ${
                event.status === "ONGOING"
                  ? "bg-green-200 text-green-900"
                  : event.status === "UPCOMING"
                  ? "bg-yellow-200 text-yellow-900"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {event.status}
            </span>
          </div>

          <h3 className="w-full text-[#FFF5E3] text-lg sm:text-xl font-cinzel font-extrabold line-clamp-1 mt-1">
            {event.name}
          </h3>

          {/* Timeline Date */}
          <div className="flex gap-1 text-[#FFF5E3] justify-start items-center mt-1">
            <svg
              className="w-[0.6rem] h-[0.6rem] shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-[0.8rem] truncate">
              {startDateFormatted} - {endDateFormatted}
            </p>
          </div>

          {/* Description */}
          <p className="w-full mt-2 font-gill text-[12px] text-[#FFF5E3] line-clamp-3">
            {trimmedDescription}
          </p>
        </div>
      </Link>

      {/* View Details Button docked directly at the bottom edge */}
      <div className="w-full mt-auto">
        <Link
          href={`/events/${event.id}`}
          className="group relative overflow-hidden transition-all duration-300 flex items-center justify-center text-center font-cinzel font-bold py-3 px-4 w-full text-[#FFF5E3] bg-black/40 hover:bg-black/50"
        >
          {/* Sliding color overlay from left on hover */}
          <span
            className="absolute inset-0 bg-black/30 transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 pointer-events-none"
            aria-hidden="true"
          />
          <span className="relative z-10 text-base sm:text-lg">View Details</span>
        </Link>
      </div>
    </div>
  );
};
