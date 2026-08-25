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
      if (session) {
        const status = await getStatusApplication(activityId, session.user.id);
        setApplicationStatus(status);
      }
    }
    fetchStatus();
  }, [session, activityId]);

  const handleApply = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Prevent application if activity has passed or quota is full
    if (isActivityPassed || isQuotaFull) {
      return;
    }

    if (!session?.user?.id) {
      signIn("google");
      return;
    }

    if (!applicationStatus) {
      confirmApply?.(async () => {
        // prevent multiple applications
        const result = await createApplication(session.user.id, activityId);
        if (result.success) {
          setApplicationStatus("PENDING");
        } else {
          alert(`Error: ${result.error}`);
        }
      });
    }
  };

  let childrenTemp = children;
  const now = new Date();
  const isActivityPassed = startDate ? new Date(startDate) < now : false;
  const isQuotaFull = quota && approvedCount !== undefined ? approvedCount >= quota : false;
  const isDisabled = isActivityPassed || isQuotaFull;

  if (status === "loading") {
    childrenTemp = "Loading...";
  } else if (!session) {
    childrenTemp = "Please Log In to Apply";
  } else if (isActivityPassed) {
    childrenTemp = "Activity Has Ended";
  } else if (isQuotaFull) {
    childrenTemp = "Quota Full";
  } else if (applicationStatus === "APPROVED") {
    childrenTemp = "Accepted";
  } else if (applicationStatus === "REJECTED") {
    childrenTemp = "Rejected";
  } else if (applicationStatus === "PENDING") {
    childrenTemp = "Waiting for Approval";
  }

  return (
    <button
      type="button"
      className={`group relative overflow-hidden transition-all duration-300 flex items-center justify-center text-center font-cinzel font-bold py-3 px-4 w-full text-[#FFF5E3] ${
        isDisabled
          ? "cursor-not-allowed bg-black/50 text-[#FFF5E3]/70"
          : "cursor-pointer bg-black/40 hover:bg-black/50"
      } ${className}`}
      onClick={handleApply}
      disabled={isDisabled}
    >
      {/* Sliding color overlay from left on hover */}
      {!isDisabled && (
        <span
          className="absolute inset-0 bg-black/30 transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 pointer-events-none"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10 text-base sm:text-lg">{childrenTemp}</span>
    </button>
  );
}
