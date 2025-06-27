/*
Warnings:

- Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product"
ADD COLUMN "category" TEXT NOT NULL DEFAULT 'General';

-- Update existing records to have a category
UPDATE "Product" SET "category" = 'General' WHERE "category" IS NULL;