"use client";

import React, { useState } from "react";
import { deleteEvent } from "@/lib/service/event";

interface EventDeleteButtonProps {
  eventId: string;
  eventName: string;
}

export default function EventDeleteButton({
  eventId,
  eventName,
}: EventDeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteEvent(eventId);
      if (res.success) {
        setIsOpen(false);
        window.location.reload();
      } else {
        alert(res.error || "Failed to delete event");
      }
    } catch {
      alert("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-[#C0392B] hover:bg-[#a93226] text-white px-3 py-1 rounded-md text-xs font-cinzel font-bold border-2 border-black shadow transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
          <div className="bg-[#7E3E11] border-2 border-black rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-2xl relative">
            <div className="bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] border-2 border-black rounded-xl p-5 sm:p-6 text-center">
              <h3 className="font-cinzel font-black text-xl text-[#541C16] mb-3 uppercase tracking-wide">
                Confirm Delete Event
              </h3>
              <p className="font-cinzel font-bold text-sm text-[#8C4A2F] mb-6">
                Are you sure you want to delete <span className="text-[#541C16] font-black">&quot;{eventName}&quot;</span>? This action cannot be undone.
              </p>

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-[#E5C198] hover:bg-[#d6af84] text-[#541C16] font-cinzel font-bold border-2 border-black rounded-lg text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
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
    </>
  );
}
