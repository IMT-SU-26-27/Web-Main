"use client";

import { useState } from "react";
import { User } from "@/types/service/user";
import { Activity } from "@/types/service/activity";
import { Competition } from "@/types/service/competition";
import { Application } from "@/types/service/application";
import EditProfileModal from "@/components/dashboard/EditProfileModal";
import StudentProfileCard from "@/components/dashboard/StudentProfileCard";
import ApplicationsBoard from "@/components/dashboard/ApplicationsBoard";
import BigWaves from "@/components/home/BigWaves";
import TitleDivider from "@/components/TitleDivider";
import { MdDashboard } from "react-icons/md";

interface StudentDashboardClientProps {
  userInfo: User;
  activityApplications: Application[];
  competitionApplications: Application[];
  activities: Activity[];
  competitions: Competition[];
  stats: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
  };
  activityStats: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
  };
  competitionStats: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
  };
}

export default function StudentDashboardClient({
  userInfo,
  activityApplications,
  competitionApplications,
  activities,
  competitions,
  stats,
}: StudentDashboardClientProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <div className="relative z-4 select-none overflow-hidden flex px-4 sm:px-8 md:px-16 lg:px-24 gap-8 sm:gap-12 flex-col items-center justify-center min-h-[90vh] pt-0 w-full overflow-x-hidden">
        {/* Top Wave */}
        <BigWaves extraClassName="rotate-x-180" />

        {/* Title Divider */}
        <TitleDivider
          title="STUDENT DASHBOARD"
          icon={<MdDashboard />}
        />

        <div className="w-full flex flex-col items-center justify-center gap-8 sm:gap-10 my-4 z-10">
          {/* 1. Student Parchment Profile Card */}
          <StudentProfileCard
            userInfo={userInfo}
            onEditClick={() => setIsEditModalOpen(true)}
          />

          {/* 2. Statistics Cards with Wooden Parchment Styling */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Total Applications */}
            <div className="group bg-[#7E3E11] border-2 border-black rounded-2xl p-2 sm:p-2.5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] border-2 border-black rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center w-full h-full">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#164098] mb-1 font-cinzel">
                  {stats.total}
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-[#541C16] uppercase tracking-wider font-cinzel">
                  Total Applications
                </div>
              </div>
            </div>

            {/* Approved */}
            <div className="group bg-[#7E3E11] border-2 border-black rounded-2xl p-2 sm:p-2.5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] border-2 border-black rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center w-full h-full">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A773C] mb-1 font-cinzel">
                  {stats.approved}
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-[#541C16] uppercase tracking-wider font-cinzel">
                  Approved
                </div>
              </div>
            </div>

            {/* Pending */}
            <div className="group bg-[#7E3E11] border-2 border-black rounded-2xl p-2 sm:p-2.5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] border-2 border-black rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center w-full h-full">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#B87106] mb-1 font-cinzel">
                  {stats.pending}
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-[#541C16] uppercase tracking-wider font-cinzel">
                  Pending
                </div>
              </div>
            </div>

            {/* Rejected */}
            <div className="group bg-[#7E3E11] border-2 border-black rounded-2xl p-2 sm:p-2.5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] border-2 border-black rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center w-full h-full">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#A81E1E] mb-1 font-cinzel">
                  {stats.rejected}
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-[#541C16] uppercase tracking-wider font-cinzel">
                  Rejected
                </div>
              </div>
            </div>
          </div>

          {/* 3. Applications Board with Wooden Parchment Reference Design */}
          <ApplicationsBoard
            activityApplications={activityApplications}
            competitionApplications={competitionApplications}
            activities={activities}
            competitions={competitions}
          />
        </div>

        {/* Bottom Wave */}
        <BigWaves extraClassName="" />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userInfo={userInfo}
      />
    </>
  );
}
