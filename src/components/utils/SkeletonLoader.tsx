import React from "react";

export default function SkeletonLoader() {
  return (
    <div className="bg-[#F5D2A4]/80 rounded-xl border-2 border-black p-6 animate-pulse shadow-inner">
      <div className="h-6 bg-[#E5C198] rounded-lg w-3/4 mb-4 border border-black/10"></div>
      <div className="h-4 bg-[#E5C198]/70 rounded w-full mb-2"></div>
      <div className="h-4 bg-[#E5C198]/70 rounded w-5/6 mb-4"></div>
      <div className="h-10 bg-[#BF6432]/30 rounded-lg w-full mt-4"></div>
    </div>
  );
}
