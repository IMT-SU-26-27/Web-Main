"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SearchableItem } from "@/types/dashboard";
import { ActionResult } from "@/types/action";

type ItemsSearchProps<T extends SearchableItem> = {
  items: T[];
  deleteItem: (id: string) => Promise<ActionResult<void>>;
  label: string;
  urlForEdit: string;
  additionalElements?: React.ReactNode;
};

export default function ItemsSearch<T extends SearchableItem>({
  items,
  deleteItem,
  label,
  urlForEdit,
  additionalElements,
}: ItemsSearchProps<T>) {
  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteItem(id);
      setConfirmId(null);
      window.location.reload();
    } catch {
      alert("Failed to delete item.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const title = (item.title || item.name || "").toLowerCase();
    const desc = (
      (item as unknown as { description?: string }).description || ""
    ).toLowerCase();
    const query = search.toLowerCase();
    return title.includes(query) || desc.includes(query);
  });

  const headerTitle = `${label.toUpperCase()} MANAGEMENT`;

  return (
    <div className="w-full h-full flex-1 flex flex-col mb-10 select-none">
      {/* Outer Wooden Board Frame */}
      <div className="relative z-2 bg-[#7E3E11] border-2 border-black rounded-2xl p-4 sm:p-6 md:p-8 w-full flex-1 flex flex-col justify-start items-center shadow-2xl mt-4">
        {/* Top Centered Wooden Plaque Header */}
        <div className="font-cinzel py-1 sm:py-1.5 md:py-2 px-6 sm:px-10 md:px-14 rounded-lg sm:rounded-xl font-bold text-white border-black text-sm sm:text-lg md:text-2xl lg:text-3xl absolute z-10 -top-4 sm:-top-5 md:-top-6 left-1/2 -translate-x-1/2 bg-[#BF6432] border-2 shadow-md flex items-center justify-center whitespace-nowrap">
          <span className="font-outline-2 sm:font-outline-4 z-1 absolute text-[#7E3E11]">
            {headerTitle}
          </span>
          <p className="relative z-2">{headerTitle}</p>
        </div>

        {/* Inner Parchment Panel */}
        <div className="flex flex-col z-1 bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] rounded-xl border-2 border-black w-full flex-1 p-4 sm:p-6 md:p-8 mt-4 sm:mt-2">
          {/* Subtitle description */}
          <div className="mb-6 text-center">
            <p className="font-cinzel font-bold text-xs sm:text-sm text-[#8C4A2F]">
              Create, update, and manage all {label.toLowerCase()} entries.
            </p>
          </div>

          {/* Search & Create Actions Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-5">
            {/* Wooden Search Bar */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={`Search ${label.toLowerCase()}s by title or keyword...`}
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

            {/* Create Action Plaque Button */}
            <div className="flex items-center gap-2">
              <Link
                href={`${urlForEdit}/create`}
                className="bg-[#F6C25B] hover:bg-[#eab044] text-[#7E3E11] px-5 py-2.5 rounded-xl font-cinzel font-bold text-xs sm:text-sm border-2 border-black shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4 text-[#7E3E11]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create {label}
              </Link>
              {additionalElements}
            </div>
          </div>

          {/* Table Container */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-[#F5D2A4]/60 border-2 border-black rounded-xl p-6">
              <p className="font-cinzel font-bold text-[#8C4A2F] text-base">
                No {label.toLowerCase()}s found.
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
                        {label} Title
                      </th>
                      <th className="px-5 py-3.5 text-left text-xs font-cinzel font-bold text-[#FFE6CD] uppercase tracking-wider">
                        Category / Info
                      </th>
                      <th className="px-5 py-3.5 text-right text-xs font-cinzel font-bold text-[#FFE6CD] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#7E3E11]/20 bg-[#FFE6CD]/70">
                    {filteredItems.map((item) => {
                      const itemObj = item as unknown as {
                        category?: string;
                        location?: string;
                        organizer?: string;
                        teamInfo?: string;
                        description?: string;
                      };

                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-[#FFD7AB]/80 transition-colors"
                        >
                          {/* Title & Details */}
                          <td className="px-5 py-4">
                            <div>
                              <div className="font-cinzel font-bold text-sm text-[#541C16]">
                                {item.title || item.name}
                              </div>
                              {itemObj.description && (
                                <p className="text-xs text-[#8C4A2F] font-medium line-clamp-1 mt-0.5 max-w-md">
                                  {itemObj.description}
                                </p>
                              )}
                            </div>
                          </td>

                          {/* Category / Info */}
                          <td className="px-5 py-4 whitespace-nowrap font-cinzel text-xs text-[#541C16] font-semibold">
                            {itemObj.organizer && (
                              <div>
                                <span className="font-bold text-[#8C4A2F]">
                                  Org:
                                </span>{" "}
                                {itemObj.organizer}
                              </div>
                            )}
                            {itemObj.category && (
                              <div>
                                <span className="font-bold text-[#8C4A2F]">
                                  Cat:
                                </span>{" "}
                                {itemObj.category}
                              </div>
                            )}
                            {itemObj.location && (
                              <div>
                                <span className="font-bold text-[#8C4A2F]">
                                  Loc:
                                </span>{" "}
                                {itemObj.location}
                              </div>
                            )}
                            {itemObj.teamInfo && (
                              <div>{itemObj.teamInfo}</div>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4 whitespace-nowrap text-right text-sm">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`${urlForEdit}/${item.id}/edit`}
                                className="bg-[#BF6432] hover:bg-[#a75427] text-white px-3 py-1 rounded-md text-xs font-cinzel font-bold border-2 border-black shadow transition-all hover:scale-105 active:scale-95"
                              >
                                Edit
                              </Link>
                              <button
                                type="button"
                                onClick={() => setConfirmId(String(item.id))}
                                className="bg-[#C0392B] hover:bg-[#a93226] text-white px-3 py-1 rounded-md text-xs font-cinzel font-bold border-2 border-black shadow transition-all hover:scale-105 active:scale-95 cursor-pointer"
                              >
                                Delete
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
      {confirmId !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
          <div className="bg-[#7E3E11] border-2 border-black rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-2xl relative">
            <div className="bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] border-2 border-black rounded-xl p-5 sm:p-6 text-center">
              <h3 className="font-cinzel font-black text-xl text-[#541C16] mb-3 uppercase tracking-wide">
                Confirm Delete {label}
              </h3>
              <p className="font-cinzel font-bold text-sm text-[#8C4A2F] mb-6">
                Are you sure you want to delete this {label.toLowerCase()}? This action cannot be undone.
              </p>

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmId(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-[#E5C198] hover:bg-[#d6af84] text-[#541C16] font-cinzel font-bold border-2 border-black rounded-lg text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(confirmId)}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-[#C0392B] hover:bg-[#a93226] text-white font-cinzel font-bold border-2 border-black rounded-lg text-xs sm:text-sm transition-all shadow hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
