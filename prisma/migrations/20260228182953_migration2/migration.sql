/*
  Warnings:

  - You are about to drop the `_EventToTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventToTags" DROP CONSTRAINT "_EventToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToTags" DROP CONSTRAINT "_EventToTags_B_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "tagsId" INTEGER;

-- DropTable
DROP TABLE "_EventToTags";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;
