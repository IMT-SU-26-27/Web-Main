"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Event } from "@/types/service/event";
import EventDeleteButton from "./EventDeleteButton";

interface EventTableProps {
  events: Event[];
}

export default function EventTable({ events }: EventTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) =>
    `${event.name} ${event.description}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const getEventStatusBadge = (status: string) => {
    switch (status) {
      case "ONGOING":
        return {
          label: "Ongoing",
          badgeClass: "bg-[#2E7D32] text-white border-2 border-black",
        };
      case "DONE":
        return {
          label: "Done",
          badgeClass: "bg-[#7E3E11] text-[#FFE6CD] border-2 border-black",
        };
      case "UPCOMING":
      default:
        return {
          label: "Upcoming",
          badgeClass: "bg-[#1976D2] text-white border-2 border-black",
        };
    }
  };

  return (
    <div className="w-full space-y-5 select-none">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        {/* Wooden Search Bar */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search events by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Create Event Wooden Plaque Button */}
        <Link
          href="/dashboard/tech/events/create"
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
          Create Event
        </Link>
      </div>

      {/* Table Container */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12 bg-[#F5D2A4]/60 border-2 border-black rounded-xl p-6">
          <p className="font-cinzel font-bold text-[#8C4A2F] text-base">
            No events found.
          </p>
          {searchQuery && (
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
                    Event Details
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-cinzel font-bold text-[#FFE6CD] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-cinzel font-bold text-[#FFE6CD] uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-cinzel font-bold text-[#FFE6CD] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#7E3E11]/20 bg-[#FFE6CD]/70">
                {filteredEvents.map((event) => {
                  const status = getEventStatusBadge(event.status);

                  return (
                    <tr
                      key={event.id}
                      className="hover:bg-[#FFD7AB]/80 transition-colors"
                    >
                      {/* Name & Cover */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-14 h-14 rounded-lg bg-[#F7DFBF] overflow-hidden shrink-0 relative border-2 border-black shadow-sm flex items-center justify-center">
                            {event.imageUrl ? (
                              <Image
                                src={event.imageUrl}
                                alt={event.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#8C4A2F] font-cinzel text-xs font-bold text-center p-1">
                                No Image
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-cinzel font-bold text-sm text-[#541C16] line-clamp-1">
                              {event.name}
                            </div>
                            <p className="text-xs text-[#8C4A2F] font-medium line-clamp-1 mt-0.5 max-w-sm">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-0.5 text-xs font-cinzel font-bold rounded-md shadow-xs ${status.badgeClass}`}
                        >
                          {status.label}
                        </span>
                      </td>

                      {/* Dates */}
                      <td className="px-5 py-4 whitespace-nowrap font-cinzel text-xs text-[#541C16] font-semibold">
                        <div>
                          <span className="font-bold text-[#8C4A2F]">Start:</span>{" "}
                          {new Date(event.startDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div className="mt-0.5">
                          <span className="font-bold text-[#8C4A2F]">End:</span>{" "}
                          {new Date(event.endDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/dashboard/tech/events/${event.id}/edit`}
                            className="bg-[#BF6432] hover:bg-[#a75427] text-white px-3 py-1 rounded-md text-xs font-cinzel font-bold border-2 border-black shadow transition-all hover:scale-105 active:scale-95"
                          >
                            Edit
                          </Link>
                          <EventDeleteButton
                            eventId={event.id}
                            eventName={event.name}
                          />
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
  );
}
