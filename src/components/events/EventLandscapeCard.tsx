"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { Event } from "@/types/service/event";
import { MdCalendarToday, MdEvent } from "react-icons/md";

interface EventLandscapeCardProps {
  event: Event;
  index: number;
}

export default function EventLandscapeCard({
  event,
  index,
}: EventLandscapeCardProps) {
  const isReverse = index % 2 === 1;

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
    <div className="relative w-full z-10">
      {/* Horizontal Branch & Node connecting directly to the vertical timeline spine */}
      <div className="absolute -left-8 sm:-left-12 md:-left-14 top-10 sm:top-12 flex items-center z-10 pointer-events-none">
        {/* Clean Node anchored on the vertical line */}
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border-3 sm:border-4 border-[#164098] shrink-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#F6C25B]"></div>
        </div>
        {/* Horizontal Connector Line into the card */}
        <div className="w-3.5 sm:w-6 md:w-8 h-0.5 bg-white/50"></div>
      </div>

      {/* Glassmorphic Landscape Card */}
      <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-8 shadow-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
        <div
          className={`flex flex-col ${
            isReverse ? "md:flex-row-reverse" : "md:flex-row"
          } gap-6 sm:gap-8 items-center w-full relative z-10`}
        >
          {/* Image Section */}
          <div className="w-full md:w-[45%] h-56 sm:h-72 rounded-xl overflow-hidden border border-white/25 shadow-lg relative shrink-0 bg-black/20">
            {event.imagePublicId ? (
              <CldImage
                src={event.imagePublicId}
                alt={event.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <Image
                src={event.imageUrl || "/placeholder/placeholder.png"}
                alt={event.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            )}
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-between w-full md:w-[55%] gap-4 text-left">
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-cinzel font-black uppercase tracking-wider border shadow-xs backdrop-blur-xs ${
                  event.status === "ONGOING"
                    ? "bg-emerald-500/25 text-emerald-200 border-emerald-400/50"
                    : event.status === "UPCOMING"
                    ? "bg-amber-500/25 text-amber-200 border-amber-400/50"
                    : "bg-white/10 text-white/70 border-white/20"
                }`}
              >
                {event.status}
              </span>
            </div>

            {/* Event Title */}
            <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              {event.name}
            </h2>

            {/* Timeline Date */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold font-cinzel text-white/90">
              <MdCalendarToday className="w-4 h-4 text-[#F6C25B] shrink-0" />
              <span>
                {startDateFormatted} - {endDateFormatted}
              </span>
            </div>

            {/* Description */}
            <p className="font-gill text-sm sm:text-base text-white/90 line-clamp-3 text-justify leading-relaxed">
              {event.description}
            </p>

            {/* View Details Button inside the card */}
            <div className="pt-2">
              <Link
                href={`/events/${event.id}`}
                className="inline-flex items-center justify-center font-cinzel font-black px-7 py-3 rounded-xl shadow-lg bg-[#F6C25B] hover:bg-[#eab044] text-[#541C16] border-2 border-black/80 hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm sm:text-base tracking-wider uppercase"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
