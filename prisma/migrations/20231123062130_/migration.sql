/*
  Warnings:

  - You are about to drop the column `ultimo_login` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Autenticacao" ADD COLUMN     "ultimo_login" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "ultimo_login";
