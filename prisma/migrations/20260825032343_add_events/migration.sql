-- CreateEnum
CREATE TYPE "public"."EventStatus" AS ENUM ('UPCOMING', 'ONGOING', 'DONE');

-- CreateTable
CREATE TABLE "public"."Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "public"."EventStatus" NOT NULL DEFAULT 'UPCOMING',
    "imageUrl" TEXT,
    "imagePublicId" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
