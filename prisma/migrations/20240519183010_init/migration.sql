/*
  Warnings:

  - Added the required column `prodId` to the `ProductLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productlog` ADD COLUMN `prodId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ProductLog` ADD CONSTRAINT `ProductLog_prodId_fkey` FOREIGN KEY (`prodId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
