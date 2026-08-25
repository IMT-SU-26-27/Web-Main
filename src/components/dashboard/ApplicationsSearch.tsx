"use client";

import React, { useState } from "react";
import { ApplicationWithDetails } from "@/types/service/application";
import { Status } from "@prisma/client";
import { ActionResult } from "@/types/action";

type ApplicationsSearchProps = {
  applications: ApplicationWithDetails[];
  updateApplicationStatus: (
    id: string,
    status: Status
  ) => Promise<ActionResult<void>>;
  label?: string;
  additionalElements?: React.ReactNode;
};

type ConfirmAction = {
  id: string;
  action: "approve" | "reject" | "pending";
  applicantName: string;
};

const getStatusBadge = (status: Status) => {
  switch (status) {
    case Status.APPROVED:
      return {
        label: "Approved",
        badgeClass: "bg-[#2E7D32] text-white border-2 border-black",
      };
    case Status.REJECTED:
      return {
        label: "Rejected",
        badgeClass: "bg-[#C0392B] text-white border-2 border-black",
      };
    case Status.PENDING:
    default:
      return {
        label: "Pending",
        badgeClass: "bg-[#F6C25B] text-[#7E3E11] border-2 border-black",
      };
  }
};

const getTypeDisplay = (application: ApplicationWithDetails): string => {
  if (application.activity) {
    return "Activity";
  } else if (application.competition) {
    return "Competition";
  }
  return "Unknown";
};

const getActivityName = (application: ApplicationWithDetails): string => {
  if (application.activity) {
    return application.activity.title;
  } else if (application.competition) {
    return application.competition.name;
  }
  return "N/A";
};

export default function ApplicationsSearch({
  applications,
  updateApplicationStatus,
  additionalElements,
}: ApplicationsSearchProps) {
  const [search, setSearch] = useState("");
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const handleStatusChange = (
    id: string,
    status: Status,
    applicantName: string
  ) => {
    const actionMap = {
      [Status.APPROVED]: "approve" as const,
      [Status.REJECTED]: "reject" as const,
      [Status.PENDING]: "pending" as const,
    };

    setConfirmAction({
      id,
      action: actionMap[status],
      applicantName,
    });
  };

  const executeAction = async () => {
    if (!confirmAction) return;

    setLoading(true);
    try {
      const statusMap = {
        approve: Status.APPROVED,
        reject: Status.REJECTED,
        pending: Status.PENDING,
      };
      await updateApplicationStatus(
        confirmAction.id,
        statusMap[confirmAction.action as keyof typeof statusMap]
      );
    } catch (error) {
      console.error("Error executing action:", error);
    } finally {
      setLoading(false);
      setConfirmAction(null);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const name = (app.user.name || "").toLowerCase();
    const email = (app.user.email || "").toLowerCase();
    const nim = (app.user.nim || "").toLowerCase();
    const itemTitle = getActivityName(app).toLowerCase();
    const query = search.toLowerCase();

    return (
      name.includes(query) ||
      email.includes(query) ||
      nim.includes(query) ||
      itemTitle.includes(query)
    );
  });

  return (
    <div className="w-full h-full flex-1 flex flex-col mb-10 select-none">
      {/* Outer Wooden Board Frame */}
      <div className="relative z-2 bg-[#7E3E11] border-2 border-black rounded-2xl p-4 sm:p-6 md:p-8 w-full flex-1 flex flex-col justify-start items-center shadow-2xl mt-4">
        {/* Top Centered Wooden Plaque Header */}
        <div className="font-cinzel py-1 sm:py-1.5 md:py-2 px-6 sm:px-10 md:px-14 rounded-lg sm:rounded-xl font-bold text-white border-black text-sm sm:text-lg md:text-2xl lg:text-3xl absolute z-10 -top-4 sm:-top-5 md:-top-6 left-1/2 -translate-x-1/2 bg-[#BF6432] border-2 shadow-md flex items-center justify-center whitespace-nowrap">
          <span className="font-outline-2 sm:font-outline-4 z-1 absolute text-[#7E3E11]">
            APPLICATION MANAGEMENT
          </span>
          <p className="relative z-2">APPLICATION MANAGEMENT</p>
        </div>

        {/* Inner Parchment Panel */}
        <div className="flex flex-col z-1 bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] rounded-xl border-2 border-black w-full flex-1 p-4 sm:p-6 md:p-8 mt-4 sm:mt-2">
          {/* Subtitle description */}
          <div className="mb-6 text-center">
            <p className="font-cinzel font-bold text-xs sm:text-sm text-[#8C4A2F]">
              Review student registrations and manage application approval statuses.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-5">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search applications by student name, email, NIM, or activity/competition..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5D2A4] border-2 border-black rounded-xl font-cinzel font-bold text-xs sm:text-sm text-[#541C16] focus:outline-none placeholder-[#8C4A2F]/70 shadow-inner"
              />
              <svg
                className="absolute left-3.5 top-3 h-4 w-4 text-[#7E3E11]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {additionalElements}
          </div>

          {/* Table Container */}
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 bg-[#F5D2A4]/60 border-2 border-black rounded-xl p-6">
              <p className="font-cinzel font-bold text-[#8C4A2F] text-base">
                No applications found.
              </p>
              {search && (
                <p className="font-cinzel font-semibold text-[#8C4A2F]/80 text-xs mt-1">
                  Try clearing your search query.
                </p>
              )}
            </div>
          ) : (
            <div className="bg-[#F5D2A4] rounded-xl border-2 border-black shadow-inner overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-black">
                  <thead className="bg-[#7E3E11]">
                    <tr>
                      <th className="px-5 py-3.5 text-left text-xs font-cinzel font-bold text-[#FFE6CD] uppercase tracking-wider">
                        Applicant Info
                      </th>
                      <th className="px-5 py-3.5 text-left text-xs font-cinzel font-bold text-[#FFE6CD] uppercase tracking-wider">
                        Activity / Competition
                      </th>
                      <th className="px-5 py-3.5 text-left text-xs font-cinzel font-bold text-[#FFE6CD] uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-5 py-3.5 text-left text-xs font-cinzel font-bold text-[#FFE6CD] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-5 py-3.5 text-right text-xs font-cinzel font-bold text-[#FFE6CD] uppercase tracking-wider">
                        Update Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#7E3E11]/20 bg-[#FFE6CD]/70">
                    {filteredApplications.map((application) => {
                      const status = getStatusBadge(application.status);

                      return (
                        <tr
                          key={application.id}
                          className="hover:bg-[#FFD7AB]/80 transition-colors"
                        >
                          {/* Applicant Info */}
                          <td className="px-5 py-4">
                            <div className="space-y-0.5">
                              <div className="font-cinzel font-bold text-sm text-[#541C16]">
                                {application.user.name || "N/A"}
                              </div>
                              <div className="font-cinzel text-xs text-[#8C4A2F]">
                                {application.user.email || "N/A"}
                              </div>
                              {application.user.nim && (
                                <div className="font-cinzel text-xs text-[#8C4A2F] font-semibold">
                                  NIM: {application.user.nim}
                                </div>
                              )}
                              {application.user.phoneNumber && (
                                <div className="font-cinzel text-xs text-[#8C4A2F]">
                                  Phone: {application.user.phoneNumber}
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Activity / Competition */}
                          <td className="px-5 py-4 font-cinzel font-bold text-sm text-[#541C16]">
                            {getActivityName(application)}
                          </td>

                          {/* Type */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2.5 py-0.5 text-xs font-cinzel font-bold rounded-md bg-[#F5D2A4] text-[#541C16] border border-black shadow-xs">
                              {getTypeDisplay(application)}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-3 py-0.5 text-xs font-cinzel font-bold rounded-md shadow-xs ${status.badgeClass}`}
                            >
                              {status.label}
                            </span>
                          </td>

                          {/* Status Actions */}
                          <td className="px-5 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Approve Button */}
                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusChange(
                                    application.id,
                                    Status.APPROVED,
                                    application.user.name || "Student"
                                  )
                                }
                                disabled={
                                  application.status === Status.APPROVED
                                }
                                className={`px-2.5 py-1 rounded-md text-xs font-cinzel font-bold border-2 border-black transition-all ${
                                  application.status === Status.APPROVED
                                    ? "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed opacity-50"
                                    : "bg-[#2E7D32] hover:bg-[#256629] text-white shadow hover:scale-105 active:scale-95 cursor-pointer"
                                }`}
                              >
                                Approve
                              </button>

                              {/* Pending Button */}
                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusChange(
                                    application.id,
                                    Status.PENDING,
                                    application.user.name || "Student"
                                  )
                                }
                                disabled={
                                  application.status === Status.PENDING
                                }
                                className={`px-2.5 py-1 rounded-md text-xs font-cinzel font-bold border-2 border-black transition-all ${
                                  application.status === Status.PENDING
                                    ? "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed opacity-50"
                                    : "bg-[#F6C25B] hover:bg-[#eab044] text-[#7E3E11] shadow hover:scale-105 active:scale-95 cursor-pointer"
                                }`}
                              >
                                Pending
                              </button>

                              {/* Reject Button */}
                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusChange(
                                    application.id,
                                    Status.REJECTED,
                                    application.user.name || "Student"
                                  )
                                }
                                disabled={
                                  application.status === Status.REJECTED
                                }
                                className={`px-2.5 py-1 rounded-md text-xs font-cinzel font-bold border-2 border-black transition-all ${
                                  application.status === Status.REJECTED
                                    ? "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed opacity-50"
                                    : "bg-[#C0392B] hover:bg-[#a93226] text-white shadow hover:scale-105 active:scale-95 cursor-pointer"
                                }`}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmAction !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
          <div className="bg-[#7E3E11] border-2 border-black rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-2xl relative">
            <div className="bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] border-2 border-black rounded-xl p-5 sm:p-6 text-center">
              <h3 className="font-cinzel font-black text-xl text-[#541C16] mb-3 uppercase tracking-wide">
                Confirm Status Update
              </h3>
              <p className="font-cinzel font-bold text-sm text-[#8C4A2F] mb-6">
                Are you sure you want to{" "}
                <span className="text-[#541C16] font-black uppercase underline">
                  {confirmAction.action}
                </span>{" "}
                the application from{" "}
                <span className="text-[#541C16] font-black">
                  &quot;{confirmAction.applicantName}&quot;
                </span>
                ?
              </p>

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmAction(null)}
                  disabled={loading}
                  className="px-4 py-2 bg-[#E5C198] hover:bg-[#d6af84] text-[#541C16] font-cinzel font-bold border-2 border-black rounded-lg text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={executeAction}
                  disabled={loading}
                  className={`px-4 py-2 text-white font-cinzel font-bold border-2 border-black rounded-lg text-xs sm:text-sm transition-all shadow hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer ${
                    confirmAction.action === "approve"
                      ? "bg-[#2E7D32] hover:bg-[#256629]"
                      : confirmAction.action === "reject"
                      ? "bg-[#C0392B] hover:bg-[#a93226]"
                      : "bg-[#F6C25B] hover:bg-[#eab044] text-[#7E3E11]"
                  }`}
                >
                  {loading
                    ? "Processing..."
                    : `Confirm ${
                        confirmAction.action.charAt(0).toUpperCase() +
                        confirmAction.action.slice(1)
                      }`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
