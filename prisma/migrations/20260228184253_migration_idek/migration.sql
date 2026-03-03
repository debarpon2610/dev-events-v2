/*
  Warnings:

  - You are about to drop the column `tagsId` on the `Event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_tagsId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "tagsId";

-- CreateTable
CREATE TABLE "_EventToTags" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EventToTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EventToTags_B_index" ON "_EventToTags"("B");

-- AddForeignKey
ALTER TABLE "_EventToTags" ADD CONSTRAINT "_EventToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTags" ADD CONSTRAINT "_EventToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
