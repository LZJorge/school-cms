/*
  Warnings:

  - You are about to drop the `Teacher_Section` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `remaining_quotas` on the `Section` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `course_id` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Phone_user_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Teacher_Section";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Section" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "remaining_quotas" INTEGER NOT NULL,
    "schedule" DATETIME NOT NULL,
    "course_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    CONSTRAINT "Section_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Section_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Section" ("id", "number", "remaining_quotas", "schedule") SELECT "id", "number", "remaining_quotas", "schedule" FROM "Section";
DROP TABLE "Section";
ALTER TABLE "new_Section" RENAME TO "Section";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
