import React from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { getAchievementById } from "@/lib/service/achievement";
import NotFound from "./not-found";
import Link from "next/link";
import BigWaves from "@/components/home/BigWaves";
import { IoArrowBackCircle } from "react-icons/io5";

export async function generateMetadata(props: {
  params: Promise<{ achievementId: string }>;
}) {
  const params = await props.params;
  const achievementId = params.achievementId;

  const achievement = await getAchievementById(achievementId);

  if (!achievement) {
    return {
      title: "Achievement Not Found",
    };
  }

  return {
    title: achievement.title,
  };
}

export default async function AchievementDetails(props: {
  params: Promise<{ achievementId: string }>;
}) {
  const params = await props.params;
  const achievementId = params.achievementId;

  const achievement = await getAchievementById(achievementId);

  if (!achievement) {
    return <NotFound />;
  }

  const title = achievement.title;
  const teamInfo = achievement.teamInfo;
  const description =
    achievement.description ||
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

  return (
    <div className="relative z-4 select-none overflow-hidden flex px-4 sm:px-8 md:px-16 lg:px-24 gap-8 sm:gap-12 flex-col items-center justify-center min-h-[90vh] pt-0 w-full overflow-x-hidden">
      <BigWaves extraClassName="rotate-x-180" />

      <div className="relative my-24 z-10 container mx-auto px-6 lg:px-20 mt-8">
        {/* Back Navigation Button */}
        <div className="mt-4 flex justify-left w-full">
          <Link href="/achievements">
            <button className="bg-[#b3caeb] text-[#1c3c86] text-2xl md:text-3xl font-extrabold px-16 py-3.5 rounded-lg shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer font-cinzel flex items-center gap-2">
              <IoArrowBackCircle /> Back
            </button>
          </Link>
        </div>
        <br />

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-24 w-full">
          {/* Left Column: Image Frame & Mascot */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
            {/* The Beige Frame */}
            <div className="relative bg-[#f4ebd0] w-[340px] h-[340px] md:w-[480px] md:h-[480px] shadow-2xl rounded-sm border-[12px] border-[#f4ebd0] z-10 flex items-center justify-center">
              {/* Actual Image Goes Here */}
              <div className="bg-gray-300 w-full h-full relative overflow-hidden">
                {achievement.imagePublicId ? (
                  <CldImage
                    draggable={false}
                    loading="lazy"
                    src={achievement.imagePublicId}
                    alt={achievement.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={achievement.imageUrl || "/placeholder/placeholder.png"}
                    alt={achievement.title}
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

          {/* Right Column: Title, Info & Description */}
          <div className="flex flex-col w-full lg:w-1/2 gap-8 text-left">
            <div className="relative inline-block w-full">
              <h1 className="font-extrabold text-5xl md:text-6xl lg:text-[70px] tracking-wide text-white leading-tight font-cinzel">
                {title}
              </h1>
              {teamInfo && (
                <h2 className="text-2xl md:text-3xl font-bold mt-2 text-white font-family-glacial">
                  {teamInfo}
                </h2>
              )}

              {/* Floating Bubbles */}
              <div className="absolute -top-12 -right-0 hidden lg:block opacity-60">
                <div className="w-12 h-12 bg-white/20 rounded-full blur-[2px] absolute top-0 left-0"></div>
                <div className="w-16 h-16 bg-white/20 rounded-full blur-[2px] absolute top-8 left-12"></div>
                <div className="w-10 h-10 bg-white/20 rounded-full blur-[2px] absolute top-24 left-8"></div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-2 text-lg md:text-xl font-medium leading-relaxed text-white/95 text-justify font-gill">
              {description}
            </div>
          </div>
        </div>
      </div>

      <BigWaves extraClassName="" />
    </div>
  );
}
