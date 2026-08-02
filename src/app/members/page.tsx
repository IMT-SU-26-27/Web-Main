"use client";
import DivisionHeader from "@/components/members/DivisionHeader";
import MemberCard from "@/components/members/MemberCard";
import Image from "next/image";
import "@/styles/members.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import type { Division } from "@/types/members";

gsap.registerPlugin(ScrollTrigger);

const PLACEHOLDER_DESCRIPTION =
  "Leads and coordinates the department to ensure every task and project runs smoothly.";

const DIVISIONS: Division[] = [
  {
    name: "Head Of Department",
    description: PLACEHOLDER_DESCRIPTION,
    members: [
      {
        id: "hod-1",
        name: "Dave Gideon T.W.",
        role: "President",
        imagesrc: "/hod/dave.jpg",
      },
      {
        id: "hod-2",
        name: "Marcellino Indra W.",
        role: "Vice President",
        imagesrc: "/hod/acel.jpg",
      },
      {
        id: "hod-3",
        name: "Theressa N.T.",
        role: "Secretary",
        imagesrc: "/hod/there.jpg",
      },
      {
        id: "hod-4",
        name: "Graciella Chelsea L.",
        role: "Secretary",
        imagesrc: "/hod/chelsealu.jpg",
      },
      {
        id: "hod-5",
        name: "Priscilia King C.",
        role: "Treasurer",
        imagesrc: "/hod/priscilia.jpg",
      },
      {
        id: "hod-6",
        name: "Chrisensia A.G.",
        role: "Treasurer",
        imagesrc: "/hod/abbie.jpg",
      },
    ],
  },
  {
    name: "Internal Division",
    description: PLACEHOLDER_DESCRIPTION,
    members: [
      {
        id: "internal-1",
        name: "Rinaldy Tanriady T.",
        role: "Coordinator",
        imagesrc: "/internal/rinaldy.jpg",
      },
      {
        id: "internal-2",
        name: "Dave Tristian N.",
        role: "Member",
        imagesrc: "/internal/dave.jpg",
      },
      {
        id: "internal-3",
        name: "Amadeus Ian G.",
        role: "Member",
        imagesrc: "/internal/amadeus.jpg",
      },
      {
        id: "internal-4",
        name: "Eileen Cynthia Mark",
        role: "Member",
        imagesrc: "/internal/eileen.jpg",
      },
      {
        id: "internal-5",
        name: "Angga Dhamika J.",
        role: "Member",
        imagesrc: "/internal/angga.jpg",
      },
    ],
  },
  {
    name: "External Division",
    description: PLACEHOLDER_DESCRIPTION,
    members: [
      {
        id: "external-1",
        name: "Delvincent Patricio",
        role: "Coordinator",
        imagesrc: "/external/delvincent.jpg",
      },
      {
        id: "external-2",
        name: "Muhammad Altaf H.",
        role: "Member",
        imagesrc: "/external/altaf.jpg",
      },
      {
        id: "external-3",
        name: "Kristoforus B.W.",
        role: "Member",
        imagesrc: "/external/bb.jpg",
      },
      {
        id: "external-4",
        name: "Nicholas Gerwin M.",
        role: "Member",
        imagesrc: "/external/niki.jpg",
      },
      {
        id: "external-5",
        name: "Filemon Jose H.",
        role: "Member",
        imagesrc: "/external/jose.jpg",
      },
      {
        id: "external-6",
        name: "Wesley Goeinwan",
        role: "Member",
        imagesrc: "/external/wesley.jpg",
      },
    ],
  },
  {
    name: "PDD Design",
    description: PLACEHOLDER_DESCRIPTION,
    members: [
      {
        id: "pdddesign-1",
        name: "Rex Kenny W.",
        role: "Coordinator",
        imagesrc: "/pdddesign/rex.jpg",
      },
      {
        id: "pdddesign-2",
        name: "Chelsea Deanna H.",
        role: "Member",
        imagesrc: "/pdddesign/cz.jpg",
      },
      {
        id: "pdddesign-3",
        name: "Matahari Dea Z.",
        role: "Member",
        imagesrc: "/pdddesign/matahari.jpg",
      },
      {
        id: "pdddesign-4",
        name: "Bryan Carlie L.S.",
        role: "Member",
        imagesrc: "/pdddesign/bc.jpg",
      },
      {
        id: "pdddesign-5",
        name: "Jason Christoper",
        role: "Member",
        imagesrc: "/pdddesign/jc.jpg",
      },
      {
        id: "pdddesign-6",
        name: "Jason Tio",
        role: "Member",
        imagesrc: "/pdddesign/jason.jpg",
      },
      {
        id: "pdddesign-7",
        name: "Clarice Harijanto",
        role: "Member",
        imagesrc: "/pr/clarice.jpg",
      },
    ],
  },
  {
    name: "PDD Documentation",
    description: PLACEHOLDER_DESCRIPTION,
    members: [
      {
        id: "pdddoc-1",
        name: "Matthew Regan H.",
        role: "Coordinator",
        imagesrc: "/pdddocum/matthewregan.jpg",
      },
      {
        id: "pdddoc-2",
        name: "Sean Lawton",
        role: "Member",
        imagesrc: "/pdddocum/sean.jpg",
      },
      {
        id: "pdddoc-3",
        name: "Flabianos Jason M.",
        role: "Member",
        imagesrc: "/pdddocum/flabianos.jpg",
      },
      {
        id: "pdddoc-4",
        name: "Keane Juan S.",
        role: "Member",
        imagesrc: "/pdddocum/keane.jpg",
      },
      {
        id: "pdddoc-5",
        name: "Stevanus Ivan S.",
        role: "Member",
        imagesrc: "/pdddocum/ivan.jpg",
      },
      {
        id: "pdddoc-6",
        name: "Clarrence A.H.",
        role: "Member",
        imagesrc: "/pdddocum/clarrence.jpg",
      },
      {
        id: "pdddoc-7",
        name: "Kenneth J.H.",
        role: "Member",
        imagesrc: "/pdddocum/kenneth.jpg",
      },
    ],
  },
  {
    name: "Public Relation",
    description: PLACEHOLDER_DESCRIPTION,
    members: [
      {
        id: "pr-1",
        name: "Felicia Joshlyn P.",
        role: "Coordinator",
        imagesrc: "/pr/feli.jpg",
      },
      {
        id: "pr-2",
        name: "Shatrya C.C.",
        role: "Member",
        imagesrc: "/pr/shatrya.jpg",
      },
      {
        id: "pr-3",
        name: "Dylan Patrick W.",
        role: "Member",
        imagesrc: "/pr/dylan.jpg",
      },
    ],
  },
  {
    name: "Social Activity",
    description: PLACEHOLDER_DESCRIPTION,
    members: [
      {
        id: "sa-1",
        name: "Aaron Asa S.",
        role: "Coordinator",
        imagesrc: "/sa/aaron.jpg",
      },
      {
        id: "sa-2",
        name: "Hans Vere Liem",
        role: "Member",
        imagesrc: "/sa/hanz.jpg",
      },
      {
        id: "sa-3",
        name: "Muh. Dzaky N.A.",
        role: "Member",
        imagesrc: "/sa/dzaky.jpg",
      },
      {
        id: "sa-4",
        name: "Jeferey Teddy S.",
        role: "Member",
        imagesrc: "/sa/jeferey.jpg",
      },
    ],
  },
  {
    name: "Technology",
    description: PLACEHOLDER_DESCRIPTION,
    members: [
      {
        id: "tech-1",
        name: "Valentino Manuel G.",
        role: "Coordinator",
        imagesrc: "/tech/valen.jpg",
      },
      {
        id: "tech-2",
        name: "Bryan Fernando D.",
        role: "Member",
        imagesrc: "/tech/bryan.jpg",
      },
      {
        id: "tech-3",
        name: "Obie Zuriel",
        role: "Member",
        imagesrc: "/tech/obie.jpg",
      },
      {
        id: "tech-4",
        name: "Felix Richardo",
        role: "Member",
        imagesrc: "/tech/felix.jpg",
      },
      {
        id: "tech-5",
        name: "Nicholas Leroy K.",
        role: "Member",
        imagesrc: "/tech/nicho.jpg",
      },
    ],
  },
];

export default function Committee() {
  // Reset scroll position saat component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    // Refresh ScrollTrigger setelah scroll reset
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  useGSAP(() => {
    // Clear semua ScrollTrigger sebelumnya
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
            refreshPriority: -1,
          },
        }
      );
    });

    // Commented out as the 25/26 mockup has no star/cloud/tape decorations, so the selectors match nothing. kept here in case decorative assets come back.
    // gsap.to(".yellowstarasset", {
    //   rotate: 360,
    //   repeat: -1,
    //   duration: 10,
    //   ease: "linear",
    // });
    // gsap.to(".redstarasset", {
    //   rotate: 360,
    //   repeat: -1,
    //   duration: 10,
    //   ease: "linear",
    // });
    // gsap.to(".starasset", {
    //   rotate: 360,
    //   repeat: -1,
    //   duration: 10,
    //   ease: "linear",
    // });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col items-center w-full min-h-screen bg-medium-blue pt-[14vh] pb-24">
        {/* Main Title */}
        <div className="section-reveal flex justify-center w-full px-4">
          <Image
            src="/members/members-placeholder.webp"
            alt="Members"
            width={1600}
            height={385}
            priority
            className="w-[clamp(18rem,60vw,46rem)] h-auto"
          />
        </div>

        {DIVISIONS.map((division) => (
          <section
            key={division.name}
            className="section-reveal flex flex-col items-center w-full mt-16 sm:mt-24"
          >
            <DivisionHeader
              name={division.name}
              description={division.description}
            />
            <div className="member-grid mt-8 sm:mt-10">
              {division.members.map((member, index) => (
                <MemberCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  role={member.role}
                  colorIndex={index}
                  imagesrc={member.imagesrc}
                  // gender={...} — commented out (for now) since it doesn't
                  // affect the 25/26 card design; see src/types/members.ts
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
