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

## Lista de rotas

Todas as rotas podem ser testas usando um API Client da sua preferência, através do link de deploy https://autenticacao-restful-api.onrender.com

<details>
<summary> 
<b><font color="#D9730D">POST</font></b><font> /usuario 
</summary>
<br>

* Cria um usuário
#
* Input:

```typescript
{ 
  nome: string,
  email: string,
  senha: string,
  telefones: [ { numero: string, ddd: string }, ... ]
}
```
#
* Output: 

```typescript
{
	id: string, // uuid
	data_criacao: Date,
	data_atualizacao: Date,
	ultimo_login: Date,
	token: string // token JWT
}
```
#
* Regras
  * Todos os campos são obrigatórios; se um deles estiver faltando ou não estiver no formato correto será retornado <font color="red">422 (Unprocessable Entity)</font>
  * Em caso de e-mail já cadastrado, será retornado <font color="red">409 (Conflict)</font>

</details>

<details>
<summary> 
<b><font color="#D9730D">POST</font></b><font> /login 
</summary>
<br>

* Realiza o login do usuário
#
* Input:

```typescript
{ 
	email: string,
	senha: string
}
```
#
* Output: 

```typescript
{
	id: string, // uuid
	data_criacao: Date,
	data_atualizacao: Date,
	ultimo_login: Date,
	token: string // token JWT
}
```
#
* Regras
  * Todos os campos são obrigatórios; se um deles estiver faltando ou não estiver no formato correto será retornado <font color="red">422 (Unprocessable Entity)</font>
  * Em caso de e-mail e/ou senha incorretos, sera retornado <font color="red">401 (Unauthorized)</font>

</details>

<details>
<summary> 
<b><font color="#448375">GET</font></b><font> /usuario/:id 
</summary>
<br>

* Busca os dados de um usuário com uma sessão ativa
#
* Output: objeto com os dados daquele usuário

```typescript
{
	id: string, // uuid
	nome: string,
	email: string,
	token: string, // token JWT
	ultimo_login: Date,
	telefones: [ { numero: string, ddd: string }, ... ]
}
```
#
* Regras
  * Caso o id fornecido não exista, será retornado <font color="red">404 (Not Found)</font>
  * Caso o token fornecido seja inválido, será retornado <font color="red">401 (Unauthorized)</font>
  * Caso o token fornecido tenha expirado (mais de 30 minutos), será retornado <font color="red">401 (Unauthorized)</font>

</details>
