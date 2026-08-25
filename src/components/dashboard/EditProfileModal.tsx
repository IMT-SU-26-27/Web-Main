"use client";

import { useState } from "react";
import { updateUser } from "@/lib/service/user";
import { User } from "@/types/service/user";
import { MdEdit, MdClose } from "react-icons/md";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo: User;
  onSuccess?: () => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  userInfo,
  onSuccess,
}: EditProfileModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await updateUser(userInfo.id, formData);

      if (result.success) {
        onSuccess?.();
        onClose();
        window.location.reload();
      } else {
        setError(result.error || "Failed to update profile");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
      {/* Outer Wooden Board Frame */}
      <div className="bg-[#7E3E11] border-2 border-black rounded-2xl p-2.5 sm:p-3 shadow-2xl w-full max-w-md relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Inner Parchment Panel */}
        <div className="bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] border-2 border-black rounded-xl p-5 sm:p-6 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-black/20">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#BF6432] rounded-xl border-2 border-black flex items-center justify-center shadow-md text-white text-lg">
                <MdEdit />
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-cinzel text-[#541C16] uppercase tracking-wide">
                Edit Profile
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 bg-[#BF6432] hover:bg-[#a75427] text-white border-2 border-black rounded-lg transition-transform duration-200 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100/90 border-2 border-red-500 rounded-xl">
              <p className="text-red-900 font-cinzel font-bold text-xs sm:text-sm">
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NIM Field */}
            <div>
              <label
                htmlFor="nim"
                className="block text-xs sm:text-sm font-black font-cinzel text-[#541C16] uppercase tracking-wider mb-1.5"
              >
                NIM (Student ID)
              </label>
              <input
                type="text"
                id="nim"
                name="nim"
                defaultValue={userInfo.nim || ""}
                placeholder="Enter your 13-digit NIM"
                className="w-full px-3.5 py-2.5 bg-[#FFF8EE] border-2 border-[#8C4A2F]/50 rounded-xl focus:border-[#7E3E11] focus:ring-1 focus:ring-[#7E3E11] focus:outline-none transition-colors text-[#541C16] font-cinzel font-bold placeholder-[#8C4A2F]/50 text-sm shadow-inner"
                disabled={isSubmitting}
              />
              <p className="text-[11px] text-[#8C4A2F] font-cinzel font-semibold mt-1">
                Make sure your NIM is 13 digits long
              </p>
            </div>

            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-xs sm:text-sm font-black font-cinzel text-[#541C16] uppercase tracking-wider mb-1.5"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={userInfo.phoneNumber || ""}
                placeholder="e.g. +62 812 3456 7890"
                className="w-full px-3.5 py-2.5 bg-[#FFF8EE] border-2 border-[#8C4A2F]/50 rounded-xl focus:border-[#7E3E11] focus:ring-1 focus:ring-[#7E3E11] focus:outline-none transition-colors text-[#541C16] font-cinzel font-bold placeholder-[#8C4A2F]/50 text-sm shadow-inner"
                disabled={isSubmitting}
              />
              <p className="text-[11px] text-[#8C4A2F] font-cinzel font-semibold mt-1">
                Include country code for international numbers
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 py-2.5 sm:py-3 bg-[#E5C198] hover:bg-[#d6af84] disabled:opacity-60 text-[#541C16] font-cinzel font-bold rounded-xl border-2 border-black text-xs sm:text-sm transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 sm:py-3 bg-[#F6C25B] hover:bg-[#eab044] disabled:opacity-60 text-[#541C16] font-cinzel font-black rounded-xl border-2 border-black text-xs sm:text-sm transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 text-center uppercase tracking-wider"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
