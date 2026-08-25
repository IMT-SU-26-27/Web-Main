"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Application } from "@/types/service/application";
import { Activity } from "@/types/service/activity";
import { Competition } from "@/types/service/competition";
import DeleteButtonWithConfirmation from "@/components/dashboard/DeleteButtonWithConfirmation";

interface ApplicationsBoardProps {
  activityApplications: Application[];
  competitionApplications: Application[];
  activities: Activity[];
  competitions: Competition[];
}

export default function ApplicationsBoard({
  activityApplications,
  competitionApplications,
  activities,
  competitions,
}: ApplicationsBoardProps) {
  const [activeTab, setActiveTab] = useState<"activity" | "competition">("activity");

  const toggleTab = () => {
    setActiveTab((prev) => (prev === "activity" ? "competition" : "activity"));
  };

  const isActivity = activeTab === "activity";
  const title = isActivity ? "ACTIVITY APPLICATIONS" : "COMPETITION APPLICATIONS";
  const currentApplications = isActivity ? activityApplications : competitionApplications;
  const currentItems = isActivity ? activities : competitions;

  return (
    <div className="w-full flex justify-center mb-10 select-none">
      {/* Outer Wooden Board Frame */}
      <div className="relative z-2 bg-[#7E3E11] border-2 border-black rounded-2xl p-4 sm:p-6 md:p-8 w-full flex flex-col justify-center items-center shadow-2xl">
        {/* Top Centered Wooden Plaque with Navigation Arrows */}
        <div className="absolute -top-4 sm:-top-5 md:-top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-10 select-none">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={toggleTab}
            aria-label="Previous Application Type"
            className="w-7 h-7 sm:w-9 sm:h-9 bg-[#F6C25B] hover:bg-[#eab044] border-2 border-black rounded-md flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-[#7E3E11] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M16 4l-12 8 12 8V4z" />
            </svg>
          </button>

          {/* Center Wooden Plaque */}
          <div className="font-cinzel py-1 sm:py-1.5 md:py-2 px-5 sm:px-8 md:px-10 rounded-lg sm:rounded-xl font-bold text-white border-black text-xs sm:text-base md:text-xl lg:text-2xl bg-[#BF6432] border-2 shadow-md flex items-center justify-center whitespace-nowrap">
            <span className="font-outline-2 sm:font-outline-4 z-1 absolute text-[#7E3E11]">
              {title}
            </span>
            <p className="relative z-2">{title}</p>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={toggleTab}
            aria-label="Next Application Type"
            className="w-7 h-7 sm:w-9 sm:h-9 bg-[#F6C25B] hover:bg-[#eab044] border-2 border-black rounded-md flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-[#7E3E11] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M8 4l12 8-12 8V4z" />
            </svg>
          </button>
        </div>

        {/* Inner Parchment Panel */}
        <div className="flex flex-col z-1 bg-gradient-to-b rounded-xl border-2 border-black from-[#FFD7AB] to-[#FFE6CD] w-full min-h-full p-3 sm:p-6 md:p-8 pt-7 sm:pt-9 md:pt-10">
          {/* Inner Bordered Table Area */}
          <div className="border-2 border-black rounded-xl p-3 sm:p-5 bg-[#F6D0A2]/40 w-full overflow-hidden">
            {currentApplications.length === 0 ? (
              <div className="text-center py-12 px-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#541C16] mb-2 font-cinzel">
                  No {isActivity ? "Activity" : "Competition"} Applications Yet
                </h3>
                <p className="text-[#7E3E11] mb-6 text-xs sm:text-sm md:text-base font-gill max-w-md mx-auto">
                  You haven&apos;t applied for any {isActivity ? "activities" : "competitions"} yet.
                </p>
                <Link
                  href={isActivity ? "/activities" : "/competitions"}
                  className="inline-flex items-center bg-[#BF6432] hover:bg-[#a75427] text-white border-2 border-black font-bold py-2.5 px-6 rounded-lg transition-all duration-200 hover:scale-105 font-cinzel text-xs sm:text-sm shadow-md"
                >
                  Browse {isActivity ? "Activities" : "Competitions"}
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto w-full rounded-lg">
                <table className="min-w-full text-left border-collapse">
                  {/* Table Header */}
                  <thead>
                    <tr className="border-b-2 border-black/30">
                      <th className="py-3 px-3 sm:px-6 font-cinzel font-extrabold text-xs sm:text-sm md:text-base text-[#541C16] uppercase tracking-wider">
                        TITLE
                      </th>
                      <th className="py-3 px-3 sm:px-6 font-cinzel font-extrabold text-xs sm:text-sm md:text-base text-[#541C16] uppercase tracking-wider text-center">
                        STATUS
                      </th>
                      <th className="py-3 px-3 sm:px-6 font-cinzel font-extrabold text-xs sm:text-sm md:text-base text-[#541C16] uppercase tracking-wider text-center">
                        APPLIED DATE
                      </th>
                      <th className="py-3 px-3 sm:px-6 font-cinzel font-extrabold text-xs sm:text-sm md:text-base text-[#541C16] uppercase tracking-wider text-center">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>

                  {/* Striped Table Body */}
                  <tbody className="rounded-lg overflow-hidden">
                    {currentApplications.map((app, idx) => {
                      const item = currentItems[idx];
                      const isEven = idx % 2 === 0;

                      return (
                        <tr
                          key={app.id}
                          className={`transition-colors duration-150 border-b border-black/10 ${
                            isEven ? "bg-[#FFF8EE]" : "bg-[#FFE7CA]"
                          } hover:bg-[#F6D0A2]/60`}
                        >
                          {/* Title */}
                          <td className="py-3 sm:py-4 px-3 sm:px-6 font-cinzel font-bold text-xs sm:text-sm md:text-base text-[#541C16]">
                            {isActivity
                              ? (item as Activity)?.title || "Unknown Activity"
                              : (item as Competition)?.name || "Unknown Competition"}
                          </td>

                          {/* Status */}
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-center">
                            <span
                              className={`inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold font-cinzel border shadow-xs ${
                                app.status === "APPROVED"
                                  ? "bg-green-100 text-green-800 border-green-400"
                                  : app.status === "REJECTED"
                                  ? "bg-red-100 text-red-800 border-red-400"
                                  : "bg-yellow-100 text-yellow-800 border-yellow-400"
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>

                          {/* Applied Date */}
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-center font-cinzel font-medium text-xs sm:text-sm text-[#541C16]">
                            {app.createdAt
                              ? new Date(app.createdAt).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })
                              : "N/A"}
                          </td>

                          {/* Actions */}
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-center">
                            <div className="flex justify-center items-center">
                              <DeleteButtonWithConfirmation applicationId={app.id} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
