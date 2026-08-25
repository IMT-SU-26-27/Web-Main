"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdPeople, MdEvent } from "react-icons/md";

export default function TechDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const prevBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#F4F1EA";
    return () => {
      document.body.style.backgroundColor = prevBg;
    };
  }, []);

  const navItems = [
    {
      label: "Users",
      href: "/dashboard/tech",
      icon: <MdPeople className="w-5 h-5" />,
      exact: true,
    },
    {
      label: "Events",
      href: "/dashboard/tech/events",
      icon: <MdEvent className="w-5 h-5" />,
      exact: false,
    },
  ];

  const isItemActive = (item: (typeof navItems)[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] flex flex-col">
      <div className="h-[6.5vh] bg-[#F4F1EA] w-full shrink-0"></div>
      <div className="flex flex-1 min-h-[93.5vh] bg-[#F4F1EA]">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-[#7E3E11] border-r-2 border-black p-5 shrink-0 select-none shadow-2xl relative z-20">
          {/* Wooden Header Card */}
          <div className="bg-gradient-to-b from-[#FFD7AB] to-[#FFE6CD] border-2 border-black rounded-xl p-4 mb-6 shadow-md flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border-2 border-black bg-[#F7DFBF] overflow-hidden flex items-center justify-center p-2 mb-2 shadow-inner">
              <Image
                src="/logos/su-logo.webp"
                alt="Logo SU"
                width={50}
                height={50}
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="font-cinzel font-black text-[#541C16] text-base uppercase tracking-wider">
              Tech Dashboard
            </h2>
            <p className="font-cinzel font-bold text-xs text-[#8C4A2F]">
              Technology & Web Admin
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-3 flex-1">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-cinzel font-bold text-sm border-2 border-black transition-all duration-200 shadow-md ${
                    active
                      ? "bg-[#BF6432] text-white scale-[1.02]"
                      : "bg-[#F5D2A4] text-[#541C16] hover:bg-[#ffe6cd] hover:scale-[1.02]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={active ? "text-[#FFE6CD]" : "text-[#7E3E11]"}>
                      {item.icon}
                    </span>
                    <span className="tracking-wide">{item.label}</span>
                  </div>
                  {active && (
                    <div className="w-2.5 h-2.5 bg-[#F6C25B] border border-black rounded-full shadow-sm" />
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Navigation Bottom Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#7E3E11] border-t-2 border-black z-40 px-4 py-2 flex justify-around items-center shadow-2xl">
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 font-cinzel font-bold text-xs py-1.5 px-6 rounded-lg border-2 border-black transition-all ${
                  active
                    ? "bg-[#BF6432] text-white shadow-md scale-105"
                    : "bg-[#F5D2A4] text-[#541C16]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full min-h-[93.5vh] overflow-x-hidden p-4 sm:p-6 md:p-8 mb-20 md:mb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
