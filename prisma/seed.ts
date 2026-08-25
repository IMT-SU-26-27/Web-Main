import prisma from "../src/lib/prisma";
require("dotenv").config();

export async function main() {
  console.log("Seeding events database...");

  // Clean existing events
  await prisma.event.deleteMany({});

  // Seed Events
  const events = await prisma.event.createMany({
    data: [
      {
        name: "PULSE",
        description:
          "PULSE (Pekan Unjuk Loyalitas dan Semangat Entrepreneurship) is the annual welcoming and orientation event for new Informatics freshmen, introducing them to the academic journey and student life.",
        status: "DONE",
        startDate: new Date("2025-08-21T09:00:00Z"),
        endDate: new Date("2025-08-21T17:00:00Z"),
        imageUrl: "/event/pulse/Cover.jpg",
        imagePublicId: null,
      },
      {
        name: "DEANS CUP",
        description:
          "Dean's Cup is an inter-batch championship bringing together Informatics and School of Information Technology students in friendly sports and e-sports competitions.",
        status: "DONE",
        startDate: new Date("2025-09-15T09:00:00Z"),
        endDate: new Date("2025-09-15T17:00:00Z"),
        imageUrl: null,
        imagePublicId: null,
      },
      {
        name: "TECHNOCAMP",
        description:
          "TechnoCamp is an immersive technical and leadership camp focusing on hands-on technology workshops, problem-solving, collaboration, and personal development.",
        status: "DONE",
        startDate: new Date("2025-10-21T09:00:00Z"),
        endDate: new Date("2025-10-23T17:00:00Z"),
        imageUrl: "/event/technocamp/Cover.jpg",
        imagePublicId: null,
      },
      {
        name: "INAUGURATION NIGHT",
        description:
          "Inauguration Night marks the official installation and celebration welcoming the newly appointed Student Union committee members.",
        status: "DONE",
        startDate: new Date("2025-10-30T18:00:00Z"),
        endDate: new Date("2025-10-30T22:00:00Z"),
        imageUrl: null,
        imagePublicId: null,
      },
      {
        name: "NPLC",
        description:
          "National Programming Logic Competition (NPLC) is a premier national programming contest challenging logic, algorithm formulation, and competitive problem-solving.",
        status: "DONE",
        startDate: new Date("2025-11-08T08:00:00Z"),
        endDate: new Date("2025-11-08T17:00:00Z"),
        imageUrl: null,
        imagePublicId: null,
      },
      {
        name: "RED CARPET NIGHT",
        description:
          "Red Carpet Night is an appreciation and awarding gala honoring outstanding student achievements, leadership excellence, and community contributions.",
        status: "UPCOMING",
        startDate: new Date("2026-02-20T18:00:00Z"),
        endDate: new Date("2026-02-20T22:00:00Z"),
        imageUrl: "/event/red-carpet-night/rcn.webp",
        imagePublicId: null,
      },
      {
        name: "HACKFEST HACKATHON",
        description:
          "Hackfest Hackathon is a high-energy 24-hour hackathon where student teams design, build, and pitch innovative software solutions to real-world problems.",
        status: "UPCOMING",
        startDate: new Date("2026-04-17T08:00:00Z"),
        endDate: new Date("2026-04-18T18:00:00Z"),
        imageUrl: "/event/hackfest/hackfest.webp",
        imagePublicId: null,
      },
    ],
    skipDuplicates: true,
  });

  console.log(`Created ${events.count} events`);
  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
