import React from "react";
import Image from "next/image";
import CloudinaryImage from "@/components/CloudinaryImage";
import { getEventById } from "@/lib/service/event";
import NotFound from "./not-found";
import Link from "next/link";
import BigWaves from "@/components/home/BigWaves";
import { IoArrowBackCircle } from "react-icons/io5";
import {
  MdEvent,
  MdCalendarToday,
} from "react-icons/md";

export async function generateMetadata(props: {
  params: Promise<{ eventId: string }>;
}) {
  const params = await props.params;
  const eventId = params.eventId;

  const event = await getEventById(eventId);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: event.name,
  };
}

const EventDetails = async (props: {
  params: Promise<{ eventId: string }>;
}) => {
  const params = await props.params;
  const eventId = params.eventId;

  const event = await getEventById(eventId);

  if (!event) {
    return <NotFound />;
  }

  const title = event.name;
  const description =
    event.description ||
    "Join this exciting event organized by Student Union to connect, learn, and experience amazing moments.";

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
    <div className="relative z-4 select-none overflow-hidden flex px-4 sm:px-8 md:px-16 lg:px-24 gap-8 sm:gap-12 flex-col items-center justify-center min-h-[90vh] pt-0 w-full overflow-x-hidden">
      <BigWaves extraClassName="rotate-x-180" />

      <div className="relative my-24 z-10 container mx-auto px-6 lg:px-20 mt-8">
        {/* Back Navigation Button */}
        <div className="mt-4 flex justify-left w-full">
          <Link href="/events">
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
                {event.imagePublicId ? (
                  <CloudinaryImage
                    draggable={false}
                    loading="lazy"
                    src={event.imagePublicId}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={event.imageUrl || "/placeholder/placeholder.png"}
                    alt={event.name}
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

          {/* Right Column: Title, Info, Description */}
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

            {/* Retro Pixel Capsule Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
              {/* Status Badge (Red) */}
              <div className="bg-[#E85A65] border-3 border-[#8A242B] rounded-2xl p-1.5 flex items-center shadow-lg hover:scale-[1.02] transition-transform">
                <div className="w-10 sm:w-12 flex items-center justify-center shrink-0">
                  <MdEvent className="w-6 h-6 text-[#731E24]" />
                </div>
                <div className="bg-[#FFFDF4] rounded-xl flex-1 px-3 py-1.5 sm:py-2 flex flex-col justify-center min-w-0 border border-black/5">
                  <span className="font-pixelify uppercase font-bold text-[10px] sm:text-xs text-[#8A242B] tracking-wider leading-none">
                    Status
                  </span>
                  <span className="font-pixelify font-black text-sm sm:text-base text-[#8A242B] uppercase tracking-wide truncate mt-0.5 leading-tight">
                    {event.status}
                  </span>
                </div>
              </div>

              {/* Timeline Badge (Purple) */}
              <div className="bg-[#9D78C9] border-3 border-[#4C2E73] rounded-2xl p-1.5 flex items-center shadow-lg hover:scale-[1.02] transition-transform">
                <div className="w-10 sm:w-12 flex items-center justify-center shrink-0">
                  <MdCalendarToday className="w-6 h-6 text-[#412466]" />
                </div>
                <div className="bg-[#FFFDF4] rounded-xl flex-1 px-3 py-1.5 sm:py-2 flex flex-col justify-center min-w-0 border border-black/5">
                  <span className="font-pixelify uppercase font-bold text-[10px] sm:text-xs text-[#4C2E73] tracking-wider leading-none">
                    Timeline
                  </span>
                  <span className="font-pixelify font-black text-sm sm:text-base text-[#4C2E73] uppercase tracking-wide truncate mt-0.5 leading-tight">
                    {startDateFormatted} - {endDateFormatted}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-2 text-base sm:text-lg md:text-xl font-medium leading-relaxed text-white/95 text-justify font-gill whitespace-pre-wrap">
              {description}
            </div>
          </div>
        </div>
      </div>

      <BigWaves extraClassName="" />
    </div>
  );
};

export default EventDetails;
