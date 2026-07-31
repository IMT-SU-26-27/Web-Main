"use client";

import Link from "next/link";
import Image from "next/image";
import AchievementCard from "@/components/achievement/AchievementCard"

export function AchievementFeatured() {

  return (
    <section className="bg-gradient-to-b -mt-0.5 from-[#4A74D8] to-[#214DB0] min-h-screen w-screen overflow-x-hidden flex flex-col justify-center items-center">
      <div className="relative bg-[#7E3E11] border-2 border-black rounded-2xl p-8 w-[80%] flex justify-center items-center">
        <div className="relative flex flex-col justify-center items-center z-1 bg-gradient-to-b rounded-lg border-2 from-[#FFD7AB] to-[#FFE6CD] w-full min-h-full p-4">
          <Image alt="achievement text" width={300} height={300} src={"/achievements/achievement-text.svg"} className="mt-4 w-1/2 md:w-1/3 h-auto"></Image>
          <h3 className="text-xl text-[#543737] font-pixelify">{`Explore IMT people's achievements!`}</h3>
          
          <div className="w-full h-full my-8 flex justify-center gap-4 items-center">
            <AchievementCard></AchievementCard>
            <AchievementCard></AchievementCard>
            <AchievementCard></AchievementCard>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AchievementFeatured;
