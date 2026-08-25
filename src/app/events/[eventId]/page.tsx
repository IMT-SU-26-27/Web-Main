"use client";

import Carousel from "@/components/eventsdetails/Carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const eventsData = [
  {
    id: "pulse",
    title: "Pulse",
    date: "21 August 2025",
    description:
      "Step into the Pulse of Informatics! ✨\nIMT Pulse merupakan sebuah magang di Student Union Informatika, di sini skill komunikasi, critical thinking, dan kepemimpinan kalian akan diasah selama 1 periode! Selain itu, kalian juga akan mengembangkan komunikasi tim serta keterampilan teknis yang banyak digunakan di kehidupan kalian, sehingga siap menghadapi tantangan dunia kuliah, organisasi, maupun profesional. \nRasakan pengalaman berorganisasi sejak Semester 1! 🚀",
  },
  {
    id: "technocamp",
    title: "Technocamp",
    date: "21 OCTOBER 2025",
    description:
      "Technocamp adalah bootcamp intensif yang dirancang untuk mengembangkan skill programming dan teknologi terkini. Peserta akan belajar langsung dari industry expert melalui hands-on workshop, mentoring session, dan project-based learning. Cocok untuk pemula yang ingin terjun ke dunia tech.",
  },
];

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const [eventId, seteventId] = useState<string>("");
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  // const router = useRouter();

  useEffect(() => {
    // Resolve the params promise
    params.then(({ eventId }) => {
      seteventId(eventId);

      // Cari data event berdasarkan eventId
      const eventData = eventsData.find((event) => event.id === eventId);
      if (eventData) {
        setEventTitle(eventData.title);
        setEventDate(eventData.date);
        setEventDescription(eventData.description);
      } else {
        // Fallback jika event tidak ditemukan
        setEventTitle("Coming Soon");
        setEventDate("Coming Soon");
        setEventDescription(
          "Informasi event akan segera hadir. Stay tuned untuk update terbaru mengenai event menarik ini!"
        );
      }
    });
  }, [params]); // Sekarang hanya params yang jadi dependency

  useEffect(() => {
    // Animasi untuk decorative images - langsung pop-up tanpa scroll
    const decorativeImages = [
      ".top-left-image",
      ".top-right-image",
      ".pink-oval-image",
      ".bottom-left-image",
      ".camera-image",
    ];

    decorativeImages.forEach((selector, index) => {
      gsap.fromTo(
        selector,
        {
          opacity: 0,
          scale: 0.3,
          rotation: -15,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "back.out(1.7)",
        }
      );
    });

    // Animasi untuk title dan date dengan efek typewriter
    gsap.fromTo(
      ".event-title",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 1,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      ".event-date",
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.8,
        ease: "back.out(1.7)",
      }
    );

    // Animasi untuk description dengan stagger
    gsap.fromTo(
      ".description-paragraph",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1.5,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      ".register-button-container",
      {
        opacity: 0,
        y: -50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 2,
        ease: "back.out(1.7)",
      }
    );

    // Animasi untuk carousel dengan slide in
    gsap.fromTo(
      ".carousel-container",
      {
        opacity: 0,
        y: 50,
        rotateX: -10,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      }
    );

    // Animasi background paper dengan parallax effect
    gsap.fromTo(
      ".background-paper",
      {
        opacity: 0,
        scale: 1.1,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div className="h-[5vh] bg-[#F1EEE6]"></div>
      <div className="background-paper pt-8 relative flex flex-col items-center min-h-screen w-full bg-[url('/backgrounds/background-paper.png')] bg-contain bg-center bg-[#F1EEE6] overflow-hidden">
        {/* Decorative Elements with reduced opacity for better hierarchy */}
        <Image
          src="/eventsdetails/top-left.webp"
          alt="top left"
          width={700}
          height={475}
          className="top-left-image top-[-2rem] sm:top-[-3rem] md:top-[-4rem] left-0 absolute w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[25rem] opacity-80"
        />
        <Image
          src="/eventsdetails/top-right.svg"
          alt="top right"
          width={700}
          height={475}
          className="top-right-image top-0 right-0 absolute w-[20rem] sm:w-[25rem] md:w-[30rem] lg:w-[35rem] opacity-70"
        />
        <Image
          src="/events/pink-oval.svg"
          alt="pink oval"
          width={700}
          height={475}
          className="pink-oval-image bottom-[-10rem] sm:bottom-[-13rem] lg:bottom-[-18rem] left-[-7rem] sm:left-[-5rem] md:left-[-7rem] absolute w-[20rem] sm:w-[25rem] md:w-[30rem] lg:w-[35rem] opacity-60"
        />
        <Image
          src="/eventsdetails/bottom-left-2.svg"
          alt="bottom left"
          width={700}
          height={475}
          className="bottom-left-image bottom-[-3rem] sm:bottom-[-4rem] md:bottom-[-5rem] left-0 absolute w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[25rem] z-1 opacity-70"
        />
        <Image
          className="camera-image absolute bottom-[-2rem] sm:bottom-[-2rem] md:bottom-[-3rem] right-[-1rem] sm:right-[-2rem] md:right-[-6rem] w-[8rem] sm:w-[12rem] md:w-[15rem] lg:w-[15rem] -scale-x-100 rotate-[7deg] opacity-75"
          src="/events/camera.webp"
          alt="camera"
          width={200}
          height={200}
        />

        {/* Tampilkan Carousel dengan eventId */}
        <div className="carousel-container w-full relative mt-12 mb-8 rotate-[-1deg]">
          <Carousel eventId={eventId} />
        </div>

        {/* Event Detail Content */}
        <div className="max-w-6xl mx-auto px-8 py-16 mb-32">
          {/* Date Badge */}
          <div className="event-date mb-4">
            <span className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium tracking-wider uppercase">
              {eventDate || "Loading..."}
            </span>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="event-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-gray-900 leading-[0.9] tracking-tight">
              {eventTitle || "Loading..."}
            </h1>
          </div>

          {/* Description */}
          <div className="max-w-4xl mb-8 md:ml-2 ml-1">
            <p className="description-paragraph text-gray-700 text-xl md:text-2xl leading-relaxed font-light whitespace-pre-line">
              {eventDescription || "Loading..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
