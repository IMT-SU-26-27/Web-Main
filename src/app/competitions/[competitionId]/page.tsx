import React from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { getCompetitionById } from "@/lib/service/competition";
import NotFound from "./not-found";
import Link from "next/link";
import BigWaves from "@/components/home/BigWaves";
import { IoArrowBackCircle } from "react-icons/io5";
import {
  MdEmojiEvents,
  MdCalendarToday,
  MdGroups,
  MdPublic,
} from "react-icons/md";

export async function generateMetadata(props: {
  params: Promise<{ competitionId: string }>;
}) {
  const params = await props.params;
  const competitionId = params.competitionId;

  const competition = await getCompetitionById(competitionId);

  if (!competition) {
    return {
      title: "Competition Not Found",
    };
  }

  return {
    title: competition.name,
  };
}

const CompetitionDetails = async (props: {
  params: Promise<{ competitionId: string }>;
}) => {
  const params = await props.params;
  const competitionId = params.competitionId;

  const competition = await getCompetitionById(competitionId);

  if (!competition) {
    return <NotFound />;
  }

  const title = competition.name;
  const description =
    competition.description ||
    "Join this prestigious competition to showcase your skills, compete with talented peers, and win exciting prizes.";

  const startDateFormatted = new Date(competition.startDate).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const endDateFormatted = new Date(competition.endDate).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="relative z-4 select-none overflow-hidden flex px-4 sm:px-8 md:px-16 lg:px-24 gap-8 sm:gap-12 flex-col items-center justify-center min-h-[90vh] pt-0 w-full overflow-x-hidden">
      <BigWaves extraClassName="rotate-x-180" />

      <div className="relative my-24 z-10 container mx-auto px-6 lg:px-20 mt-8">
        {/* Back Navigation Button */}
        <div className="mt-4 flex justify-left w-full">
          <Link href="/competitions">
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
                {competition.imagePublicId ? (
                  <CldImage
                    draggable={false}
                    loading="lazy"
                    src={competition.imagePublicId}
                    alt={competition.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={competition.imageUrl || "/placeholder/placeholder.png"}
                    alt={competition.name}
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
              {/* Organizer & Category Badge (Red) */}
              <div className="bg-[#E85A65] border-3 border-[#8A242B] rounded-2xl p-1.5 flex items-center shadow-lg hover:scale-[1.02] transition-transform">
                <div className="w-10 sm:w-12 flex items-center justify-center shrink-0">
                  <MdEmojiEvents className="w-6 h-6 text-[#731E24]" />
                </div>
                <div className="bg-[#FFFDF4] rounded-xl flex-1 px-3 py-1.5 sm:py-2 flex flex-col justify-center min-w-0 border border-black/5">
                  <span className="font-pixelify uppercase font-bold text-[10px] sm:text-xs text-[#8A242B] tracking-wider leading-none">
                    Category
                  </span>
                  <span className="font-pixelify font-black text-sm sm:text-base text-[#8A242B] uppercase tracking-wide truncate mt-0.5 leading-tight">
                    {competition.category}
                  </span>
                </div>
              </div>

              {/* Date Badge (Purple) */}
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

              {/* Type Badge (Yellow) */}
              <div className="bg-[#F5D44C] border-3 border-[#947414] rounded-2xl p-1.5 flex items-center shadow-lg hover:scale-[1.02] transition-transform">
                <div className="w-10 sm:w-12 flex items-center justify-center shrink-0">
                  <MdGroups className="w-6 h-6 text-[#7D600A]" />
                </div>
                <div className="bg-[#FFFDF4] rounded-xl flex-1 px-3 py-1.5 sm:py-2 flex flex-col justify-center min-w-0 border border-black/5">
                  <span className="font-pixelify uppercase font-bold text-[10px] sm:text-xs text-[#8A6A0B] tracking-wider leading-none">
                    Type
                  </span>
                  <span className="font-pixelify font-black text-sm sm:text-base text-[#8A6A0B] uppercase tracking-wide truncate mt-0.5 leading-tight">
                    {competition.type}
                  </span>
                </div>
              </div>

              {/* Level Badge (Green) */}
              <div className="bg-[#58C673] border-3 border-[#206933] rounded-2xl p-1.5 flex items-center shadow-lg hover:scale-[1.02] transition-transform">
                <div className="w-10 sm:w-12 flex items-center justify-center shrink-0">
                  <MdPublic className="w-6 h-6 text-[#1A572B]" />
                </div>
                <div className="bg-[#FFFDF4] rounded-xl flex-1 px-3 py-1.5 sm:py-2 flex flex-col justify-center min-w-0 border border-black/5">
                  <span className="font-pixelify uppercase font-bold text-[10px] sm:text-xs text-[#206933] tracking-wider leading-none">
                    Level
                  </span>
                  <span className="font-pixelify font-black text-sm sm:text-base text-[#206933] uppercase tracking-wide truncate mt-0.5 leading-tight">
                    {competition.level}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-2 text-base sm:text-lg md:text-xl font-medium leading-relaxed text-white/95 text-justify font-gill whitespace-pre-wrap">
              {description}
            </div>

            {/* Additional Information */}
            {competition.information && (
              <div className="text-sm sm:text-base font-normal leading-relaxed text-white/80 text-justify font-gill whitespace-pre-wrap">
                {competition.information}
              </div>
            )}

            {/* Register Button */}
            <div className="mt-4 pt-2">
              <Link
                href="https://bit.ly/compucimt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-cinzel font-black px-12 py-4 text-xl sm:text-2xl rounded-xl shadow-2xl bg-[#F6C25B] hover:bg-[#eab044] text-[#541C16] border-2 border-black transition-all hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider text-center"
              >
                REGISTER NOW
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BigWaves extraClassName="" />
    </div>
  );
};

export default CompetitionDetails;
