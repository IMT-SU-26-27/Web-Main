"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Content from "./Content";

interface CarouselProps {
  eventId?: string;
} 

export default function Carousel({ eventId }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);

  // Data slides berdasarkan eventId
  const getSlidesByEventId = (eventId: string) => {
    const slideData: Record<string, Array<{ src: string; alt: string }>> = {
      pulse: [
        { src: "/event/pulse/Carousel-1.jpg", alt: "Carousel Image 1" },
        { src: "/event/pulse/Carousel-2.jpg", alt: "Carousel Image 2" },
        { src: "/event/pulse/Carousel-3.jpg", alt: "Carousel Image 3" },
        { src: "/event/pulse/Carousel-4.jpg", alt: "Carousel Image 4" },
      ],
      technocamp: [
        { src: "/event/technocamp/Carousel-1.jpg", alt: "Carousel Image 1" },
        { src: "/event/technocamp/Carousel-2.jpg", alt: "Carousel Image 2" },
        { src: "/event/technocamp/Carousel-3.jpg", alt: "Carousel Image 3" },
        { src: "/event/technocamp/Carousel-4.jpg", alt: "Carousel Image 4" },
      ],
      hackfest: [
        { src: "/event/hackfest/hackfest.webp", alt: "Hackfest Cover" },
        { src: "/event/hackfest/hackfest-carousel-1.webp", alt: "Hackfest Image 1" },
        { src: "/event/hackfest/hackfest-carousel-2.webp", alt: "Hackfest Image 2" },
        { src: "/event/hackfest/hackfest-carousel-3.webp", alt: "Hackfest Image 3" },
      ],
      "red-carpet-night": [
        { src: "/event/red-carpet-night/rcn.webp", alt: "Red Carpet Night Cover" },
        { src: "/event/red-carpet-night/rcn-1.webp", alt: "Red Carpet Night Image 1" },
        { src: "/event/red-carpet-night/rcn-2.webp", alt: "Red Carpet Night Image 2" },
        { src: "/event/red-carpet-night/rcn-3.webp", alt: "Red Carpet Night Image 3" },
      ],
      rcn: [
        { src: "/event/red-carpet-night/rcn.webp", alt: "Red Carpet Night Cover" },
        { src: "/event/red-carpet-night/rcn-1.webp", alt: "Red Carpet Night Image 1" },
        { src: "/event/red-carpet-night/rcn-2.webp", alt: "Red Carpet Night Image 2" },
        { src: "/event/red-carpet-night/rcn-3.webp", alt: "Red Carpet Night Image 3" },
      ],
    };

    const normalized = eventId.toLowerCase().trim().replace(/_/g, "-");

    // Return slides sesuai eventId, atau default jika tidak ditemukan
    return (
      slideData[normalized] ||
      slideData[eventId] || [
        { src: "/eventsdetails/template.svg", alt: "Event Image 1" },
        { src: "/eventsdetails/template.svg", alt: "Event Image 2" },
        { src: "/eventsdetails/template.svg", alt: "Event Image 3" },
        { src: "/eventsdetails/template.svg", alt: "Event Image 4" },
      ]
    );
  };

  const slides = getSlidesByEventId(eventId || "");

  useGSAP(() => {
    const slidesContainer = slidesRef.current;
    if (!slidesContainer) return;

    // Kill any existing animations on this element
    gsap.killTweensOf(slidesContainer);

    const slideWidth = 408; // 400px + 8px gap tetap
    const totalSlides = slides.length;
    const durationPerSlide = 3; // Fixed duration per slide

    // Set initial position
    gsap.set(slidesContainer, {
      x: 0,
      force3D: true,
    });

    // Create infinite loop animation yang smooth tanpa reset mendadak
    gsap.to(slidesContainer, {
      x: -slideWidth * totalSlides,
      duration: durationPerSlide * totalSlides,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: function (x) {
          // Modulo untuk seamless loop tanpa snap
          const totalWidth = slideWidth * totalSlides;
          return (parseFloat(x) % totalWidth) + "px";
        },
      },
      force3D: true,
    });
  }, [eventId, slides.length]);

  // Double slides untuk seamless loop
  const extendedSlides = [...slides, ...slides];

  return (
    <div ref={carouselRef} className="w-full scale-x-105 overflow-hidden relative">
      <div
        ref={slidesRef}
        className="flex gap-2 bg-[rgba(0,0,0,0.8)]"
        style={{
          width: `${extendedSlides.length * 408}px`,
          willChange: "transform", // CSS optimization
        }}
      >
        {extendedSlides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: "400px", height: "320px" }}
          >
            <Content src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}
