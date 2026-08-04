"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import LoginButton from "./utils/LoginButton";
import { gsap } from "gsap";

export default function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileDashboardOpen, setMobileDashboardOpen] = useState(false);
  const { data: session, status } = useSession();

  // GSAP refs for performance
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = !!session;
  const isLoading = status === "loading";

  // Optimized animation handler
  const handleMobileMenuToggle = () => {
    if (mobileMenuOpen) {
      // Close animation
      const tl = gsap.timeline({
        onComplete: () => setMobileMenuOpen(false),
      });

      // Cache the children elements
      const children = Array.from(mobileLinksRef.current?.children || []);

      // Animate links out first (staggered)
      tl.to(children, {
        x: 50,
        opacity: 0,
        duration: 0, // Faster duration
        stagger: 0.01, // Reduced stagger
        ease: "power2.in",
      })
        // Then slide menu out
        .to(mobileMenuRef.current, {
          x: "100%",
          duration: 0, // Faster duration
          ease: "power2.in",
        })
        // Fade overlay
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.15, // Faster duration
            ease: "power2.in",
          },
          "-=0.2"
        );
    } else {
      // Open animation
      setMobileMenuOpen(true);

      // Use RAF for smooth animation start
      requestAnimationFrame(() => {
        const tl = gsap.timeline();

        // Cache the children elements
        const children = Array.from(mobileLinksRef.current?.children || []);

        // Set initial states with force3D
        gsap.set(mobileMenuRef.current, { x: "100%", force3D: true });
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(children, { x: 50, opacity: 0, force3D: true });

        // Animate in
        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.2, // Faster duration
          ease: "power2.out",
        })
          .to(
            mobileMenuRef.current,
            {
              x: "0%",
              duration: 0.3, // Slightly faster
              ease: "power2.out",
              force3D: true,
            },
            "-=0.1"
          )
          .to(
            children,
            {
              x: 0,
              opacity: 1,
              duration: 0.2, // Faster duration
              stagger: 0.05, // Reduced stagger
              ease: "power2.out",
              force3D: true,
            },
            "-=0.15"
          );
      });
    }
  };

  return (
    <nav className="z-[1000] fixed flex items-center px-4 sm:px-12 justify-between w-screen min-h-[6.5vh] bg-[#fff] border-b-2 border-[#c0d0fa] text-black">
      <Link
        href="/"
        className="w-[38px] sm:w-[24px] md:w-[32px] lg:w-[36px] xl:w-[42px] 2xl:w-[48px] h-auto cursor-pointer"
      >
        <Image
          src={"/logos/su-logo.webp"}
          width={100}
          height={100}
          alt="su-logo"
        />
      </Link>

      <div className="hidden lg:text-lg xl:text-lg 2xl:text-xl lg:flex gap-4 xl:gap-8 items-center">
        <Link
          className="cursor-pointer hover:underline hover:text-blue-500"
          href="/about"
        >
          About
        </Link>
        <Link
          className="cursor-pointer hover:underline hover:text-blue-500"
          href="/events"
        >
          Events
        </Link>
        <Link
          className="cursor-pointer hover:underline hover:text-blue-500"
          href="/achievements"
        >
          Achievements
        </Link>
        <Link
          className="cursor-pointer hover:underline hover:text-blue-500"
          href="/activities"
        >
          Activities
        </Link>
        <Link
          className="cursor-pointer hover:underline hover:text-blue-500"
          href="/competitions"
        >
          Competitions
        </Link>
        <Link
          className="cursor-pointer hover:underline hover:text-blue-500"
          href="/members"
        >
          Members
        </Link>

        <div className="relative">
          {isLoading ? (
            <div className="animate-pulse bg-gray-300 w-10 h-10 rounded-full"></div>
          ) : (
            <div
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-all"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <div className="profile-image rounded-full w-10 h-10 flex items-center justify-center hover:ring-2 hover:ring-blue-300 transition-all">
                {isLoggedIn ? (
                  <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={session.user?.image || "/placeholder/person.png"}
                      width={40}
                      height={40}
                      alt="Profile Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={"/placeholder/person.png"}
                      width={40}
                      height={40}
                      alt="Guest Avatar"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[1002]">
              {isLoggedIn ? (
                <>
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {session.user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session.user?.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard/student"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    {session.user?.role === "TECH" && (
                      <Link
                        href="/dashboard/tech"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Tech Dashboard
                      </Link>
                    )}
                    {(session.user?.role === "SA" ||
                      session.user?.role === "TECH" ||
                      session.user?.role === "LECTURER") && (
                      <Link
                        href="/dashboard/sa"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        SA Dashboard
                      </Link>
                    )}
                    {(session.user?.role === "PR" ||
                      session.user?.role === "TECH") && (
                      <Link
                        href="/dashboard/pr"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        PR Dashboard
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-gray-200 py-1">
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <LoginButton />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hamburger Menu */}
      <div
        className="flex lg:hidden flex-col gap-1 items-center cursor-pointer z-[1001] bg-[#164098] p-2 rounded-sm"
        onClick={handleMobileMenuToggle}
      >
        <div className="w-7 h-1 bg-white origin-center will-change-transform"></div>
        <div className="w-7 h-1 bg-white origin-center will-change-transform"></div>
        <div className="w-7 h-1 bg-white origin-center will-change-transform"></div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={overlayRef}
          className="fixed top-[6.5vh] inset-0 z-[999] flex justify-end w-screen h-screen bg-black/60"
        >
          <div
            ref={mobileMenuRef}
            className="w-[35%] bg-[#c0d0fa] p-2 flex flex-col gap-2 will-change-transform shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.25)]"
          >
            <div ref={mobileLinksRef} className="flex flex-col gap-2">
              {isLoggedIn && (
                <div>
                  <button
                    className="text-center w-full py-2 hover:text-cyan-400 text-md border-b-white/60 border-b-1 will-change-transform flex justify-center items-center"
                    onClick={() => setMobileDashboardOpen(!mobileDashboardOpen)}
                  >
                    Dashboard
                    <svg
                      className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                        mobileDashboardOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  {mobileDashboardOpen && (
                    <div className="flex flex-col bg-white rounded-b-lg overflow-hidden">
                      <Link
                        href="/dashboard/student"
                        className="text-black text-center py-2 text-sm"
                        onClick={handleMobileMenuToggle}
                      >
                        Student
                      </Link>
                      {session.user?.role === "TECH" && (
                        <Link
                          href="/dashboard/tech"
                          className="text-black text-center py-2 text-sm"
                          onClick={handleMobileMenuToggle}
                        >
                          Tech
                        </Link>
                      )}
                      {(session.user?.role === "SA" ||
                        session.user?.role === "TECH" ||
                        session.user?.role === "LECTURER") && (
                        <Link
                          href="/dashboard/sa"
                          className="text-black text-center py-2 text-sm"
                          onClick={handleMobileMenuToggle}
                        >
                          Social Activity
                        </Link>
                      )}
                      {(session.user?.role === "PR" ||
                        session.user?.role === "TECH") && (
                        <Link
                          href="/dashboard/pr"
                          className="text-black text-center py-2 text-sm"
                          onClick={handleMobileMenuToggle}
                        >
                          Public Relations
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}
              <Link
                className="text-center w-full py-2 hover:text-green-500 text-md border-b-[#164098]/60 border-b-1 will-change-transform"
                href="/about"
                onClick={() => handleMobileMenuToggle()}
              >
                About
              </Link>

              <Link
                className="text-center w-full py-2 hover:text-red-500 text-md border-b-[#164098]/60 border-b-1 will-change-transform"
                href="/events"
                onClick={() => handleMobileMenuToggle()}
              >
                Events
              </Link>

              <Link
                className="flex justify-center items-center gap-1 text-center py-2 hover:text-blue-500 text-md border-b-[#164098]/60 border-b-1 will-change-transform"
                href="/achievements"
                onClick={() => handleMobileMenuToggle()}
              >
                Achievements
              </Link>

              <Link
                className="text-center py-2 hover:text-yellow-500 text-md border-b-[#164098]/60 border-b-1 will-change-transform"
                href="/activities"
                onClick={() => handleMobileMenuToggle()}
              >
                Activities
              </Link>

              <Link
                className="text-center w-full py-2 hover:text-slate-500 text-md border-b-[#164098]/60 border-b-1 will-change-transform"
                href="/competitions"
                onClick={() => handleMobileMenuToggle()}
              >
                Competitions
              </Link>

              <Link
                className="text-center py-2 hover:text-purple-500 text-md border-b-[#164098]/60 border-b-1 will-change-transform"
                href="/members"
                onClick={() => handleMobileMenuToggle()}
              >
                Members
              </Link>

              {/* Mobile Auth Section */}
              <div className="flex justify-center will-change-transform">
                {isLoggedIn ? (
                  <div className="text-center bg-white rounded-lg p-4 w-full">
                    <p className="text-sm text-gray-600 w-full overflow-auto text-center">
                      {session.user?.email}
                    </p>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        handleMobileMenuToggle();
                      }}
                      className="text-red-600 hover:text-red-700 text-sm mt-1"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <LoginButton />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {profileDropdownOpen && (
        <div
          className="fixed inset-0 z-[1001]"
          onClick={() => setProfileDropdownOpen(false)}
        ></div>
      )}
    </nav>
  );
}
