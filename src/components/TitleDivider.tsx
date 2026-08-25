import React from "react";
import { TitleDividerProps } from "@/types/divider";

export default function TitleDivider({
  title,
  icon,
  className = "",
  colorClassName = "bg-[#FFF8E7]",
}: TitleDividerProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 sm:gap-6 select-none">
      {/* Title & Icon Header */}
      {(title || icon) && (
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 text-[#FFF5E3] text-center px-2">
          {icon && (
            <span className="text-3xl sm:text-4xl md:text-5xl shrink-0 flex items-center">
              {icon}
            </span>
          )}
          {title && (
            <h1 className="font-bold font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-wide uppercase">
              {title}
            </h1>
          )}
        </div>
      )}

      {/* Decorative Divider Line */}
      <div
        className={`w-full flex items-center justify-center gap-2 sm:gap-3 md:gap-4 select-none ${className}`}
        aria-hidden="true"
      >
        {/* Left Dot */}
        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full shrink-0 ${colorClassName}`} />

        {/* Left Line */}
        <div className={`flex-1 h-[1.5px] sm:h-[2px] md:h-[2.5px] ${colorClassName}`} />

        {/* Center Diamond */}
        <div
          className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5 rotate-45 shrink-0 mx-0.5 sm:mx-1 ${colorClassName}`}
        />

        {/* Right Line */}
        <div className={`flex-1 h-[1.5px] sm:h-[2px] md:h-[2.5px] ${colorClassName}`} />

        {/* Right Dot */}
        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full shrink-0 ${colorClassName}`} />
      </div>
    </div>
  );
}
