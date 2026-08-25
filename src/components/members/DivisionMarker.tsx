import React from "react";
import { DivisionMarkerProps } from "@/types/committee";



export default function DivisionMarker({ division }: DivisionMarkerProps) {
  return (
    <div className="relative flex items-center justify-center select-none my-4">
      <div className="absolute -bottom-2 z-1 -right-2 sm:px-7 py-3 rounded-lg bg-amber-500 w-full h-full"></div>
      {/* Main Ornate Division Plaque */}
      <div
        className={`z-3 relative flex flex-col items-center gap-3 sm:gap-4 px-4 sm:px-7 py-3 rounded-lg bg-secondary shadow-xl backdrop-blur-md max-w-2xl w-full sm:w-auto`}
      >
        <span className="w-full h-0.25 bg-white"></span>
        <div className="flex flex-col text-left flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <h2 className="font-cinzel font-semibold text-white text-sm sm:text-lg md:text-xl tracking-wider uppercase truncate">
              {division}
            </h2>
          </div>
        </div>
        <span className="w-full h-0.25 bg-white"></span>
      </div>
    </div>
  );
}
