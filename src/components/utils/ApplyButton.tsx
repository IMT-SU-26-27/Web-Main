"use client";

import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { createApplication, getStatusApplication } from "@/lib/service/application";
import { ApplyButtonProps } from "@/types/action";

export default function ApplyButton({
  children,
  className = "",
  activityId,
  confirmApply,
  startDate,
  quota,
  approvedCount,
}: ApplyButtonProps) {
  const { data: session, status } = useSession();
  const [applicationStatus, setApplicationStatus] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchStatus() {
      if (session?.user?.id) {
        try {
          const res = await getStatusApplication(activityId, session.user.id);
          setApplicationStatus(res || undefined);
        } catch (error) {
          console.error("Error fetching application status:", error);
        }
      }
    }
    fetchStatus();
  }, [session, activityId]);

  const now = new Date();
  const isActivityPassed = startDate ? new Date(startDate) < now : false;
  const isQuotaFull = quota && approvedCount !== undefined ? approvedCount >= quota : false;
  const isAlreadyApplied = Boolean(applicationStatus);
  const isDisabled = isActivityPassed || isQuotaFull || isAlreadyApplied || status === "loading";

  const handleApply = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isDisabled) {
      return;
    }

    if (!session?.user?.id) {
      signIn("google");
      return;
    }

    if (!applicationStatus) {
      confirmApply?.(async () => {
        const result = await createApplication(session.user.id, activityId);
        if (result.success) {
          setApplicationStatus("PENDING");
        } else {
          alert(`Error: ${result.error}`);
        }
      });
    }
  };

  let displayText = children;

  if (status === "loading") {
    displayText = "Loading...";
  } else if (isActivityPassed) {
    displayText = "Activity Has Ended";
  } else if (isQuotaFull) {
    displayText = "Quota Full";
  } else if (applicationStatus === "APPROVED") {
    displayText = "Accepted";
  } else if (applicationStatus === "REJECTED") {
    displayText = "Rejected";
  } else if (applicationStatus === "PENDING") {
    displayText = "Waiting for Approval";
  } else if (!session) {
    displayText = "Register";
  }

  return (
    <button
      type="button"
      onClick={handleApply}
      disabled={isDisabled}
      className={`group relative overflow-hidden transition-all duration-300 flex items-center justify-center text-center font-cinzel font-bold py-3 px-4 w-full text-[#FFF5E3] ${
        isDisabled
          ? "cursor-not-allowed bg-black/60 text-[#FFF5E3]/60"
          : "cursor-pointer bg-black/40 hover:bg-black/50"
      } ${className}`}
    >
      {/* Sliding color overlay from left on hover */}
      {!isDisabled && (
        <span
          className="absolute inset-0 bg-black/30 transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 pointer-events-none"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10 text-base sm:text-lg">{displayText}</span>
    </button>
  );
}
