import React from "react";
import Image from "next/image";

export default function VisionMissionSection() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10 my-4 px-2 sm:px-4 z-10">
      {/* Top Section: Veno Sungkem + SU IMT Team Card */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 w-full">
        {/* Left: Veno Sungkem Illustration */}
        <div className="w-full md:w-[45%] flex justify-center md:justify-start">
          <div className="relative w-56 sm:w-64 md:w-72 h-56 sm:h-64 md:h-72 shrink-0">
            <Image
              src="/about/veno-sungkem.svg"
              alt="Veno Sungkem"
              fill
              className="object-contain drop-shadow-md"
              draggable={false}
              priority
            />
          </div>
        </div>

        {/* Right: SU IMT Team Box Card */}
        <div className="w-full md:w-[55%] flex justify-center md:justify-end">
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-lg border border-black/10 flex flex-col items-center justify-center w-full">
            <span className="font-cinzel font-bold text-sm sm:text-base text-gray-600 uppercase tracking-widest mb-3">
              SU IMT team
            </span>
            <div className="w-full h-44 sm:h-52 rounded-xl flex items-center justify-center overflow-hidden relative border border-black/5 shadow-inner">
              <Image
                src="/about/su-imt-team.webp"
                alt="SU IMT Team"
                fill
                className="object-cover"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Vision & Mission Box Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full items-stretch">
        {/* Left: VISION Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-black/10 flex flex-col items-center text-center">
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#0C2B6A] tracking-wider mb-4 uppercase">
            VISION
          </h2>
          <p className="font-gill text-sm sm:text-base md:text-lg text-[#1C3C86] leading-relaxed text-justify sm:text-center">
            Menjadi organisasi kemahasiswaan yang dapat memberi{" "}
            <strong className="font-bold text-[#0C2B6A]">
              pengalaman bekerja untuk setiap anggota di lingkungan profesional
            </strong>
            , sehingga mereka dapat berkembang sebagai tim dan mengoptimalkan
            potensi terbaik yang dimiliki.
          </p>
        </div>

        {/* Right: MISSION Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-black/10 flex flex-col items-center">
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#0C2B6A] tracking-wider mb-4 uppercase text-center">
            MISSION
          </h2>
          <ol className="flex flex-col gap-3 font-gill text-sm sm:text-base md:text-lg text-[#1C3C86] leading-relaxed text-left w-full">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#0C2B6A] shrink-0">1.</span>
              <span>
                Membangun{" "}
                <strong className="font-bold text-[#0C2B6A]">
                  hubungan yang kuat
                </strong>{" "}
                dengan sesama mahasiswa SIFT
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#0C2B6A] shrink-0">2.</span>
              <span>
                Memberi{" "}
                <strong className="font-bold text-[#0C2B6A]">
                  wadah untuk perkembangan
                </strong>{" "}
                mahasiswa IMT
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#0C2B6A] shrink-0">3.</span>
              <span>
                Mendorong{" "}
                <strong className="font-bold text-[#0C2B6A]">
                  kolaborasi aktif dengan organisasi lain
                </strong>{" "}
                di dalam dan luar kampus
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#0C2B6A] shrink-0">4.</span>
              <span>
                Memberikan{" "}
                <strong className="font-bold text-[#0C2B6A]">
                  pengalaman dan kenangan
                </strong>{" "}
                berharga untuk anggota SU IMT
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
