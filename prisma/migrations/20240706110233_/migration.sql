/*
  Warnings:

  - A unique constraint covering the columns `[userNumber]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `userNumber` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Users_userNumber_key` ON `Users`(`userNumber`);
