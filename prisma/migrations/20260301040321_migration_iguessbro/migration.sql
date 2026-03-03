/*
  Warnings:

  - The `mode` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "mode",
ADD COLUMN     "mode" "Mode" NOT NULL DEFAULT 'OFFLINE';
