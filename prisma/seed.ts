import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  console.log("Seeding database...");

  // Seed Activities
  const activities = await prisma.activity.createMany({
    data: [
      {
        title: "Programming Workshop",
        description:
          "Learn the fundamentals of web development with HTML, CSS, and JavaScript. Perfect for beginners who want to start their coding journey.",
        location: "Computer Lab A - Building 2",
        generation: "2025",
        startDate: new Date("2025-09-15T09:00:00Z"),
        creditPoint: 2,
        quota: 30,
        imageUrl: null,
        imagePublicId: null,
        category: "ACTIVITY",
      },
      {
        title: "AI/ML Seminar",
        description:
          "Discover the world of Artificial Intelligence and Machine Learning. Guest speakers from industry will share their experiences and insights.",
        location: "Auditorium - Main Building",
        generation: "2025",
        startDate: new Date("2025-09-20T14:00:00Z"),
        creditPoint: 1,
        quota: 100,
        imageUrl: null,
        imagePublicId: null,
        category: "ACTIVITY",
      },
      {
        title: "Hackathon 2027",
        description:
          "24-hour coding competition where teams build innovative solutions to real-world problems. Prizes for top 3 teams!",
        location: "Innovation Hub - Building 3",
        generation: "2025",
        startDate: new Date("2025-10-05T18:00:00Z"),
        creditPoint: 3,
        quota: 80,
        imageUrl: null,
        imagePublicId: null,
        category: "ACTIVITY",
      },
      {
        title: "Tech Talk: Cloud Computing",
        description:
          "Deep dive into cloud technologies including AWS, Azure, and Google Cloud Platform. Learn about scalable architecture and deployment strategies.",
        location: "Conference Room 201",
        generation: "2025",
        startDate: new Date("2025-09-25T13:00:00Z"),
        creditPoint: 1,
        quota: 50,
        imageUrl: null,
        imagePublicId: null,
        category: "ACTIVITY",
      },
      {
        title: "Mobile App Development Bootcamp",
        description:
          "Intensive 3-day bootcamp covering React Native and Flutter development. Build your first mobile app from scratch.",
        location: "Tech Lab - Building 1",
        generation: "2025",
        startDate: new Date("2025-10-10T09:00:00Z"),
        creditPoint: 4,
        quota: 25,
        imageUrl: null,
        imagePublicId: null,
        category: "ACTIVITY",
      },
      {
        title: "Research Methodology Workshop",
        description:
          "Learn essential research methods and techniques for conducting academic research in computer science and technology fields.",
        location: "Research Center - Building 4",
        generation: "2025",
        startDate: new Date("2025-09-30T10:00:00Z"),
        creditPoint: 2,
        quota: 20,
        imageUrl: null,
        imagePublicId: null,
        category: "RESEARCH",
      },
      {
        title: "Student Research Symposium",
        description:
          "Present your research findings and learn from peers in this annual symposium showcasing student research projects.",
        location: "Main Auditorium",
        generation: "2025",
        startDate: new Date("2025-11-15T09:00:00Z"),
        creditPoint: 3,
        quota: 50,
        imageUrl: null,
        imagePublicId: null,
        category: "RESEARCH",
      },
    ],
    skipDuplicates: true,
  });

  // Seed Achievements
  const achievements = await prisma.achievement.createMany({
    data: [
      {
        title: "First Steps",
        description:
          "Successfully completed your first programming workshop and submitted your first project.",
        teamInfo: "Individual achievement",
        imageUrl: null,
        imagePublicId: null,
        featured: true
      },
      {
        title: "Team Player",
        description:
          "Participated in a team-based activity and demonstrated excellent collaboration skills.",
        teamInfo: "Team-based achievement",
        imageUrl: null,
        imagePublicId: null,
      },
      {
        title: "Innovation Master",
        description:
          "Won first place in a hackathon or coding competition with an innovative solution.",
        teamInfo: "Competition achievement",
        imageUrl: null,
        imagePublicId: null,
      },
      {
        title: "Knowledge Seeker",
        description:
          "Attended 5 or more seminars and tech talks, showing dedication to continuous learning.",
        teamInfo: "Individual achievement",
        imageUrl: null,
        imagePublicId: null,
      },
      {
        title: "Mentor",
        description:
          "Helped other students learn by providing guidance and support during activities.",
        teamInfo: "Leadership achievement",
        imageUrl: null,
        imagePublicId: null,
      },
      {
        title: "Early Bird",
        description:
          "One of the first 10 students to register for a high-demand activity or event.",
        teamInfo: "Individual achievement",
        imageUrl: null,
        imagePublicId: null,
      },
      {
        title: "Perfect Attendance",
        description:
          "Attended all sessions of a multi-day workshop or bootcamp without missing any.",
        teamInfo: "Individual achievement",
        imageUrl: null,
        imagePublicId: null,
      },
      {
        title: "Community Builder",
        description:
          "Actively participated in building the tech community by organizing or leading initiatives.",
        teamInfo: "Leadership achievement",
        imageUrl: null,
        imagePublicId: null,
      },
    ],
    skipDuplicates: true,
  });

  // Seed Competitions
  const competitions = await prisma.competition.createMany({
    data: [
      {
        name: "Code Challenge 2025",
        organizer: "IMT Student Union",
        description:
          "Annual programming competition featuring algorithmic challenges and problem-solving tasks. Open to all skill levels.",
        category: "Programming",
        information: "Bring your laptop and coding skills. Prizes for top 3 winners!",
        type: "INDIVIDUAL",
        level: "NATIONAL",
        startDate: new Date("2025-10-15T09:00:00Z"),
        endDate: new Date("2025-10-15T17:00:00Z"),
        imageUrl: null,
        imagePublicId: null,
      },
      {
        name: "Design Thinking Workshop",
        organizer: "Design Club IMT",
        description:
          "Creative competition focused on user experience design and innovative problem-solving methodologies.",
        category: "Design",
        information: "Team-based competition. Max 4 members per team. Design tools will be provided.",
        type: "GROUP",
        level: "REGIONAL",
        startDate: new Date("2025-11-01T10:00:00Z"),
        endDate: new Date("2025-11-01T16:00:00Z"),
        imageUrl: null,
        imagePublicId: null,
      },
      {
        name: "Lorem 2",
        organizer: "Design Club IMT",
        description:
          "Creative competition focused on user experience design and innovative problem-solving methodologies.",
        category: "Design",
        information: "Team-based competition. Max 4 members per team. Design tools will be provided.",
        type: "GROUP",
        level: "REGIONAL",
        startDate: new Date("2025-11-01T10:00:00Z"),
        endDate: new Date("2025-11-01T16:00:00Z"),
        imageUrl: null,
        imagePublicId: null,
      },
      {
        name: "Lorem 4",
        organizer: "Design Club IMT",
        description:
          "Creative competition focused on user experience design and innovative problem-solving methodologies.",
        category: "Design",
        information: "Team-based competition. Max 4 members per team. Design tools will be provided.",
        type: "GROUP",
        level: "REGIONAL",
        startDate: new Date("2025-11-01T10:00:00Z"),
        endDate: new Date("2025-11-01T16:00:00Z"),
        imageUrl: null,
        imagePublicId: null,
      },
      {
        name: "Tech Startup Pitch",
        organizer: "Entrepreneurship Center",
        description:
          "Present your startup idea to industry experts and compete for funding opportunities and mentorship.",
        category: "Business",
        information: "5-minute pitch + 3-minute Q&A. Business plan submission required.",
        type: "INDIVIDUAL",
        level: "INTERNATIONAL",
        startDate: new Date("2025-11-20T13:00:00Z"),
        endDate: new Date("2025-11-20T18:00:00Z"),
        imageUrl: null,
        imagePublicId: null,
      },
    ],
    skipDuplicates: true,
  });

  console.log(`Created ${activities.count} activities`);
  console.log(`Created ${achievements.count} achievements`);
  console.log(`Created ${competitions.count} competitions`);
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
