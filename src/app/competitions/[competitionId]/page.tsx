import React from "react";
import Image from "next/image";
import { getCompetitionById } from "@/lib/service/competition";
import NotFound from "./not-found";
import Link from "next/link";

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

  const description = competition.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

  return (
    <div className="relative min-h-screen w-full bg-[#244DB3] text-white font-sans overflow-hidden pt-24 pb-20 flex flex-col justify-center">
      
      {/* Decorative Top Waves */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          className="relative block w-full h-[60px] md:h-[120px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#3a6edb"
          ></path>
          <path
            d="M0,45.45c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39,79.4,16.83,162.29,57.83,241.28,78.66,70.05,18.48,146.53,26.09,214.34,3L1200,56.44V0H0Z"
            fill="#4c82f0"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-20 mt-8">

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-24 w-full">
          
          {/* Left Column: Image Frame & Mascot */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
            {/* The Beige Frame */}
            <div className="relative bg-[#f4ebd0] w-[340px] h-[340px] md:w-[480px] md:h-[480px] shadow-2xl rounded-sm border-[12px] border-[#f4ebd0] z-10 flex items-center justify-center">
              {/* Actual Image Goes Here */}
              <div className="bg-gray-300 w-full h-full relative overflow-hidden">
                 <Image 
                    src="/competitions/competition-detail/duck.webp" 
                    alt="Competition Image"
                    fill
                    className="object-cover"
                    unoptimized
                 />
              </div>

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

          {/* Title, Info & Description */}
          <div className="flex flex-col w-full lg:w-1/2 gap-8 text-center">
            
            <div className="relative inline-block w-full">
              <h1 className="font-extrabold text-5xl md:text-6xl lg:text-[70px] tracking-wide text-white leading-tight">
                {title}
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 text-white">
                (Team: 3-4 Members)
              </h2>

              {/* Floating Bubbles */}
              <div className="absolute -top-12 -right-0 hidden lg:block opacity-60">
                <div className="w-12 h-12 bg-white/20 rounded-full blur-[2px] absolute top-0 left-0"></div>
                <div className="w-16 h-16 bg-white/20 rounded-full blur-[2px] absolute top-8 left-12"></div>
                <div className="w-10 h-10 bg-white/20 rounded-full blur-[2px] absolute top-24 left-8"></div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-2 text-lg md:text-xl font-medium leading-relaxed lg:px-12 text-white/95 text-justify">
              {description}
            </div>

            {/* Register Button */}
            <div className="mt-4 flex justify-center w-full">
              <Link href="https://bit.ly/compucimt">
                <button className="bg-[#b3caeb] text-[#1c3c86] text-3xl md:text-4xl font-extrabold px-24 py-4 rounded-full shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 ease-in-out">
                  Register
                </button>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CompetitionDetails;
