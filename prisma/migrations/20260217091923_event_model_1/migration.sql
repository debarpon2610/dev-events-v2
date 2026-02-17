-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('HYBRID', 'ONLINE', 'OFFLINE');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(400) NOT NULL DEFAULT 'Untitled Event',
    "description" VARCHAR(1000),
    "slug" VARCHAR(800) NOT NULL,
    "overview" TEXT,
    "image" TEXT NOT NULL,
    "venue" VARCHAR(200) NOT NULL,
    "location" VARCHAR(300) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "mode" "Mode" NOT NULL DEFAULT 'OFFLINE',
    "audience" TEXT NOT NULL,
    "agenda" TEXT[],
    "organizers" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventToTags" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EventToTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE INDEX "_EventToTags_B_index" ON "_EventToTags"("B");

-- AddForeignKey
ALTER TABLE "_EventToTags" ADD CONSTRAINT "_EventToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTags" ADD CONSTRAINT "_EventToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
