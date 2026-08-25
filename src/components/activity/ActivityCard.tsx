"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Activity } from "@prisma/client";
import Link from "next/link";
import ApplyButton from "../utils/ApplyButton";
import { useState, useEffect } from "react";
import { getApprovedApplicationsCount } from "@/lib/service/activity";

const colorList = [
  "#E0353C", // Red
  "#07A54A", // Green
  "#FFB20C", // Yellow
  "#EC6DA4", // Pink
  "#8E60A5", // Purple
  "#00BA9C", // Green Lame
];

type ActivityCardProps = {
  activity: Activity;
  index: number;
  className?: string;
  confirmApply?: (onConfirm: () => Promise<void>) => void;
  category: string;
};

export const ActivityCard = ({
  activity,
  index,
  className = "",
  confirmApply,
}: ActivityCardProps) => {
  const accentColor = colorList[index % colorList.length];
  const [swinging, setSwinging] = useState(false);
  const pathname = usePathname();
  const description = activity.description;
  const trimmedDescription =
    description.length > 75 ? description.slice(0, 75) + "..." : description;

  const [approvedCount, setApprovedCount] = useState<number>(0);

  useEffect(() => {
    const fetchApprovedCount = async () => {
      const count = await getApprovedApplicationsCount(activity.id);
      setApprovedCount(count);
    };
    fetchApprovedCount();
  }, [activity.id]);

  return (
    <div
      onMouseLeave={() => {
        setSwinging(true);
        setTimeout(() => setSwinging(false), 700); // match swing duration (in global.css ; .swing-effect)
      }}
      style={{ backgroundColor: accentColor }}
      className={`transform flex flex-col justify-between transition-all duration-300 relative w-full max-w-[320px] sm:w-[320px] h-[460px] mt-8 text-left hover:rotate-[1.5deg] hover:origin-top overflow-hidden ${swinging ? "swing-effect" : ""
        } ${className}`}
    >
      {/* Top clickable area leading to activity detail */}
      <Link
        href={`${pathname.replace(/\/$/, "")}/${activity.id}`}
        className="flex-1 flex flex-col p-4 pb-2 overflow-hidden"
      >
        <div className="relative w-full h-40 sm:h-44 mb-2 overflow-hidden rounded-lg">
          <Image
            src={activity.imageUrl || "/placeholder/placeholder.png"}
            alt={activity.title}
            width={360}
            height={144}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Content */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="w-full text-[#FFF5E3] text-lg sm:text-xl font-cinzel font-extrabold line-clamp-1">
              {activity.title}
            </h3>

            {/* Location */}
            <div className="flex text-[#FFF5E3] gap-1 justify-start items-center mt-1">
              <svg className="w-[0.6rem] h-[0.6rem]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <p className="text-[0.8rem] truncate max-w-[170px]">{activity.location}</p>
            </div>

            {/* Start Date */}
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
                {new Date(activity.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>

            {/* Credit Points */}
            <div className="flex text-[#FFF5E3] gap-1 justify-start items-center mt-1">
              <svg
                className="w-[0.6rem] h-[0.6rem]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p className="text-[0.8rem]">
                {activity.creditPoint} Credit Points
              </p>
            </div>
          </div>

          {/* Quota */}
          <div className="flex text-[#FFF5E3] flex-col items-center justify-center shrink-0 ml-2">
            <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <p className="text-[0.85rem]">
              {approvedCount}/{activity.quota}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="w-full mt-2 font-gill text-[12px] text-[#FFF5E3] line-clamp-2">
          {trimmedDescription}
        </p>
      </Link>

      {/* Apply Button docked directly at the bottom edge */}
      <div className="w-full mt-auto">
        <ApplyButton
          bgColor={accentColor}
          activityId={activity.id}
          confirmApply={confirmApply}
          startDate={activity.startDate}
          quota={activity.quota}
          approvedCount={approvedCount}
        >
          Register
        </ApplyButton>
      </div>
    </div>
  );
};
