"use client";

import React, { useState, useEffect } from "react";
import ActivitiesSearch from "./ActivitiesSearch";
import { Activity, Category } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getUserById } from "@/lib/service/user";

type ClientPageActivitiesProps = {
  activities: Activity[];
  categories: Category[];
};

function ClientPageActivities({
  activities,
  categories,
}: ClientPageActivitiesProps) {
  const { data: session } = useSession();
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    (() => Promise<void>) | null
  >(null);
  const [isIncompleteProfile, setIsIncompleteProfile] = useState(false);
  const [userHasCompleteProfile, setUserHasCompleteProfile] = useState<boolean | null>(null);

  // Check user profile completeness
  useEffect(() => {
    const checkUserProfile = async () => {
      if (session?.user?.id) {
        try {
          const user = await getUserById(session.user.id);
          const hasComplete = !!(user?.nim && user?.phoneNumber);
          setUserHasCompleteProfile(hasComplete);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserHasCompleteProfile(false);
        }
      }
    };

    checkUserProfile();
  }, [session]);

  const confirmApply = async (onConfirm: () => Promise<void>) => {
    // If user profile is incomplete, show information popup
    if (userHasCompleteProfile === false) {
      setIsIncompleteProfile(true);
      setShowConfirm(true);
      return;
    }

    // Normal confirmation flow
    setIsIncompleteProfile(false);
    setShowConfirm(true);
    setPendingAction(() => onConfirm);
  };

  const handleConfirm = async () => {
    if (pendingAction) await pendingAction();
    setShowConfirm(false);
    setPendingAction(null);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setPendingAction(null);
  };

  return (
    <>
      {/* Spacer for header */}
      {/* Background Container */}
      <div className="select-none relative overflow-hidden flex flex-col items-center justify-center pt-0 w-full">
        <ActivitiesSearch
          activities={activities}
          confirmApply={confirmApply}
          categories={categories}
        />
      </div>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed z-10 inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
            {isIncompleteProfile ? (
              <>
                <h2 className="text-lg font-semibold mb-4">Incomplete Profile</h2>
                <p className="mb-6">
                  Please fill your NIM and Phone Number in your dashboard.
                </p>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-4">Confirm Application</h2>
                <p className="mb-6">
                  Are you sure you want to apply for this activity?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleConfirm}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                  >
                    No
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ClientPageActivities;
