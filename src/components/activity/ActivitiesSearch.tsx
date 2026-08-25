"use client";

import React, { useEffect, useState } from "react";
import { ActivityCard } from "@/components/activity/ActivityCard";
import SearchBar from "@/components/SearchBar";
import { Activity, Category } from "@prisma/client";
import gsap from "gsap";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface ActivitiesSearchProps {
  activities: Activity[];
  categories: Category[];
  confirmApply?: (onConfirm: () => Promise<void>) => void;
}

const ITEMS_PER_PAGE = 5;

export default function ActivitiesSearch({
  activities,
  confirmApply,
  categories,
}: ActivitiesSearchProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Transform enum categories to CategoryFilter format
  const categoryFilters = categories.map((category, index) => ({
    id: index,
    name: category,
  }));

  // Animate cards on page change or initial mount
  const animateCards = () => {
    gsap.fromTo(
      ".start-bottom",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power1.out",
        stagger: 0.08,
        clearProps: "transform",
      }
    );
  };

  useEffect(() => {
    animateCards();
  }, [currentPage]);

  return (
    <div className="z-10 w-full" id="all-activities">
      <SearchBar
        items={activities}
        className="start-bottom"
        isCentered={true}
        categories={categoryFilters}
        placeholder="Search activities..."
        getItemCategoryId={(item) => categories.indexOf(item.category)}
      >
        {(filteredActivities) => {
          const totalPages = Math.ceil(
            filteredActivities.length / ITEMS_PER_PAGE
          );
          const safeCurrentPage = Math.min(
            Math.max(currentPage, 1),
            Math.max(totalPages, 1)
          );

          const paginatedActivities = filteredActivities.slice(
            (safeCurrentPage - 1) * ITEMS_PER_PAGE,
            safeCurrentPage * ITEMS_PER_PAGE
          );

          const handlePageChange = (newPage: number) => {
            setCurrentPage(newPage);
            const searchElement = document.getElementById("all-activities");
            if (searchElement) {
              searchElement.scrollIntoView({ behavior: "smooth" });
            }
          };

          return (
            <section className="p-2 z-10 mb-10 w-full flex flex-col items-center">
              {/* Cards Grid */}
              <div className="flex flex-wrap justify-center sm:justify-between gap-y-8 w-full">
                {paginatedActivities.map((activity, index) => (
                  <div className="start-bottom" key={activity.id}>
                    <ActivityCard
                      activity={activity}
                      index={index}
                      confirmApply={confirmApply}
                      category={activity.category}
                    />
                  </div>
                ))}

                {/* Spacers to keep items on the last row left-aligned on multi-column screens */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`spacer-${i}`}
                    className="hidden sm:block w-[300px] sm:w-[320px] h-0 pointer-events-none"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {filteredActivities.length === 0 && (
                <p className="text-center text-[#FFF5E3] font-cinzel text-lg mt-8">
                  No activities found matching your search.
                </p>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-12 select-none flex-wrap">
                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(safeCurrentPage - 1)}
                    disabled={safeCurrentPage === 1}
                    aria-label="Previous Page"
                    className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-200 cursor-pointer ${
                      safeCurrentPage === 1
                        ? "opacity-40 cursor-not-allowed bg-black/20 border-white/10 text-white"
                        : "bg-black/40 hover:bg-black/60 border-white/30 text-white hover:scale-105"
                    }`}
                  >
                    <MdChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === safeCurrentPage;

                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => handlePageChange(pageNumber)}
                        aria-label={`Go to page ${pageNumber}`}
                        className={`font-cinzel text-xs sm:text-sm font-bold w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
                          isActive
                            ? "bg-[#FFF5E3] text-[#164098] shadow-md scale-105 border border-[#FFF5E3]"
                            : "bg-black/30 text-[#FFF5E3] hover:bg-black/50 border border-white/20"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(safeCurrentPage + 1)}
                    disabled={safeCurrentPage === totalPages}
                    aria-label="Next Page"
                    className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-200 cursor-pointer ${
                      safeCurrentPage === totalPages
                        ? "opacity-40 cursor-not-allowed bg-black/20 border-white/10 text-white"
                        : "bg-black/40 hover:bg-black/60 border-white/30 text-white hover:scale-105"
                    }`}
                  >
                    <MdChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              )}
            </section>
          );
        }}
      </SearchBar>
    </div>
  );
}
