import React from "react";

type TLInfoPanelDecorativeProps = {
  children: React.ReactNode;
};

export default function TLInfoPanelDecorative({
  children,
}: TLInfoPanelDecorativeProps) {
  return (
    <div className="font-cinzel py-1 sm:py-1.5 md:py-2 px-3 sm:px-6 md:px-8 rounded-lg font-bold text-white border-black text-sm sm:text-xl md:text-2xl lg:text-3xl absolute z-5 -top-3 sm:-top-4 md:-top-5 -left-2 sm:-left-4 md:-left-6 -rotate-z-[4deg] md:-rotate-z-[12deg] bg-[#BF6432] border-2 shadow-md">
      <span className="font-outline-2 sm:font-outline-4 z-1 absolute text-[#7E3E11]">
        {children}
      </span>
      <p className="relative z-2">{children}</p>
    </div>
  );
}
