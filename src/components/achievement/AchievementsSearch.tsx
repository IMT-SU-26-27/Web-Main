'use client'

import React, { useEffect } from "react";
import { AchievementCard } from "@/components/achievement/AchievementCard";
import SearchBar from "@/components/SearchBar";
import { Achievement } from "@/types/service/achievement";
import gsap from "gsap";

type colorProps = "blue" | "green" | "pink" | "red" | "yellow" | "gray";

interface AchievementsSearchProps {
  achievements: Achievement[];
  featuredAchievements?: Achievement[];
}

export default function AchievementsSearch({ achievements, featuredAchievements }: AchievementsSearchProps) {
  const colors: colorProps[] = [
    "blue",
    "red",
    "pink",
    "green",
    "yellow",
    "gray",
  ];

  // Animate all left-starting cards
  useEffect(() => {
    gsap.fromTo(
      ".start-left",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power1.out",
        stagger: 0.1,
      }
    );

    // Animate all right-starting cards
    gsap.fromTo(
      ".start-right",
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power1.out",
        stagger: 0.1,
      }
    );
    
    // Animate all bottom-starting cards
    gsap.fromTo(
      ".start-bottom",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power1.out",
        stagger: 0.1,
      }
    );
  }, []); 

  return (
    <div className="flex flex-col items-center justify-center w-full md:w-max-[70vw] h-full mt-8 pt-[10rem]">
      <SearchBar items={achievements} className="start-bottom" isCentered={true}>
        {(filteredAchievements) => (
          <>
            <div className="flex flex-col gap-4">
              {featuredAchievements && featuredAchievements.map((item, index) => {
                const borderColor = colors[index % colors.length];
                return (
                  <AchievementCard
                    key={item.id}
                    achievement={item}
                    borderColor={borderColor}
                    type="Achievement"
                    className={`${index % 2 === 0 ? "start-left" : "start-right"}`}
                  />
                )
              })}
            </div>
            <section className="flex flex-wrap justify-center gap-4 px-4">
              {filteredAchievements.map((achievement, index) => {
                const borderColor = colors[index % colors.length];
                return (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    borderColor={borderColor}
                    type="Achievement"
                    className="start-bottom"
                  />
                );
              })}
            </section>
          </>
        )}
      </SearchBar>
    </div>
  );
}
