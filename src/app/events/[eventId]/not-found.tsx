import React from "react";
import Link from "next/link";
import { IoArrowBackCircle } from "react-icons/io5";
import BigWaves from "@/components/home/BigWaves";

export default function NotFound() {
  return (
    <div className="relative z-4 select-none overflow-hidden flex px-4 sm:px-8 md:px-16 lg:px-24 gap-8 flex-col items-center justify-center min-h-[90vh] pt-0 w-full overflow-x-hidden text-center">
      <BigWaves extraClassName="rotate-x-180" />

      <div className="relative z-10 max-w-lg mx-auto py-20">
        <h1 className="text-6xl font-black text-white font-cinzel mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-cinzel mb-4">
          Event Not Found
        </h2>
        <p className="text-white/80 font-gill text-base mb-8">
          The event you are looking for does not exist or may have been removed.
        </p>
        <Link href="/events">
          <button className="bg-[#b3caeb] text-[#1c3c86] text-xl font-extrabold px-10 py-3 rounded-lg shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer font-cinzel inline-flex items-center gap-2">
            <IoArrowBackCircle /> Back to Events
          </button>
        </Link>
      </div>

      <BigWaves extraClassName="" />
    </div>
  );
}
