import React from "react";
import Link from "next/link";

type ButtonProps = {
  size: "xl" | "md" | "sm";
  children: React.ReactNode;
  href: string;
  extraClass?: string;
};

export default function LinkButton({
  href,
  children,
  size,
  extraClass = "",
}: ButtonProps) {
  const sizeClasses = {
    xl: "text-base sm:text-xl lg:text-3xl px-6 sm:px-10 lg:px-14 py-1.5 sm:py-2",
    md: "text-sm sm:text-lg lg:text-2xl px-5 sm:px-8 lg:px-10 py-1.5 sm:py-2",
    sm: "text-xs sm:text-base lg:text-xl px-4 sm:px-6 py-1 sm:py-2",
  }[size];

  return (
    <Link
      className={`bg-secondary hover:bg-amber-200 font-semibold rounded-lg border-2 border-black text-center transition-all duration-200 ${sizeClasses} ${extraClass}`}
      href={href}
    >
      {children}
    </Link>
  );
}
