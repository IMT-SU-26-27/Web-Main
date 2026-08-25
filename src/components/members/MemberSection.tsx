"use client";

import React, { useMemo } from "react";
import MemberCard from "./MemberCard";
import DivisionMarker from "./DivisionMarker";
import membersRaw from "./member-data.json";
import { Member } from "@/types/committee";

const members = membersRaw as Member[];

export default function MemberSection() {
  const groupedMembers = useMemo(() => {
    const groups: { division: string; members: Member[] }[] = [];
    const divisionMap = new Map<string, Member[]>();

    members.forEach((member) => {
      if (!divisionMap.has(member.division)) {
        divisionMap.set(member.division, []);
      }
      divisionMap.get(member.division)!.push(member);
    });

    divisionMap.forEach((divisionMembers, division) => {
      groups.push({ division, members: divisionMembers });
    });

    return groups;
  }, []);

  return (
    <div className="z-10 w-full flex flex-col items-center gap-8 sm:gap-12 pb-16 overflow-hidden">
      {groupedMembers.map(({ division, members: divMembers }) => {
        // Ensure at least enough items for a seamless infinite loop
        const repeatCount = Math.max(2, Math.ceil(12 / divMembers.length));
        const infiniteMembers: Member[] = [];
        for (let i = 0; i < repeatCount * 2; i++) {
          infiniteMembers.push(...divMembers);
        }

        return (
          <section key={division} className="w-full flex flex-col items-center overflow-hidden">
            {/* Division Plaque Marker */}
            <DivisionMarker division={division} count={divMembers.length} />

            {/* Infinite Marquee Track */}
            <div className="w-full overflow-hidden relative py-4">
              <div className="animate-marquee flex items-center gap-6">
                {infiniteMembers.map((member, index) => (
                  <div className="shrink-0" key={`${member.id}-${index}`}>
                    <MemberCard member={member} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
