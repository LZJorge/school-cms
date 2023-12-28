/*
  Warnings:

  - You are about to drop the column `personal_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `dni` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dni" INTEGER NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "birthday" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);
INSERT INTO "new_User" ("birthday", "created_at", "email", "firstname", "id", "is_active", "lastname", "password", "phone", "updated_at") SELECT "birthday", "created_at", "email", "firstname", "id", "is_active", "lastname", "password", "phone", "updated_at" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_dni_key" ON "User"("dni");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
