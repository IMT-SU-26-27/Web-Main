"use client";

import Image from "next/image";

type BoardArrowProps = {
  direction: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
  label: string;
};

export default function BoardArrow({
  direction,
  onClick,
  disabled = false,
  label,
}: BoardArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="cursor-pointer transition disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:brightness-110 enabled:active:scale-95"
    >
      <Image
        src={`/board/${direction}-arrow.webp`}
        alt=""
        width={1600}
        height={1755}
        draggable={false}
        className="w-[clamp(2rem,3.9vw,3.4rem)] h-auto select-none"
      />
    </button>
  );
}
