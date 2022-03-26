/*
  Warnings:

  - Made the column `owner` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_owner_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "owner" SET NOT NULL,
ALTER COLUMN "owner" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
