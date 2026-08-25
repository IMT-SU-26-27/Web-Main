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
  activityStats,
  competitionStats,
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

          {/* 2. Applications Board with Embedded Statistics Inside */}
          <ApplicationsBoard
            activityApplications={activityApplications}
            competitionApplications={competitionApplications}
            activities={activities}
            competitions={competitions}
            stats={stats}
            activityStats={activityStats}
            competitionStats={competitionStats}
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
