-- AlterTable
ALTER TABLE "Autenticacao" ADD COLUMN     "ultimo_login" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "ultimo_login" TIMESTAMP(3);
