# Desafio técnico Desenvolvedor Backend Escribo

O desafio consistia na implementação de uma API RESTful para autenticação de usuários


## Sobre

Essa API permite operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário

## Tecnologias utilizadas

* Node.js (20.8.0)
* TypeScript
* Express.js
* Prisma ORM
* PostgreSQL
* Joi
* Jest


## Rodando localmente

1. Clone o projeto

```bash
  git clone https://github.com/thiago-arend/segundo-desafio-tecnico-backend-escribo.git
```

#

2. Abra o terminal dentro da pasta onde você clonou o repositório. Entre no diretório do projeto

```bash
  cd segundo-desafio-tecnico-backend-escribo
```

#

3. Instale as dependências

```bash
  npm install
```

#

4. Copie o conteúdo do arquivo '.env.example' e cole em um arquivo '.env' recém criado. Em seguida, altere as variáveis DATABASE_URL (deve conter a string de conexão com seu banco de dados postgreSQL) e JWT_SECRET (deve conter uma senha para geração do token JWT)

#

5. Copie o conteúdo do arquivo '.env.example' e cole em um **arquivo '.env.test'** recém criado. Em seguida, altere as variáveis DATABASE_URL (deve conter a string de conexão com seu **banco de dados postgreSQL para testes**) e JWT_SECRET (deve conter uma senha para geração do token JWT)

#

6. Rode o comando para geração do banco de dados de desenvolvimento

```bash
  npm run dev:migration:run
```

#

7. Rode o comando para geração do banco de dados de testes

```bash
  npm run test:migration:run
```

#

8. Rode o comando para subir o servidor

```bash
  npm run dev
```

## Rodando os testes

Execute o seguinte script dentro da mesma pasta onde o arquivo package.json está localizado para executar todos os testes disponíveis

```bash
  npm run test
```
