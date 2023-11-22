-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Autenticacao" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Autenticacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Telefone" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "ddd" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "Telefone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Autenticacao_id_usuario_key" ON "Autenticacao"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Telefone_id_usuario_key" ON "Telefone"("id_usuario");

-- AddForeignKey
ALTER TABLE "Autenticacao" ADD CONSTRAINT "Autenticacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
