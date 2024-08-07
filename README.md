# Natura Challenge

Este projeto é um desafio desenvolvido para a Natura, utilizando as mais modernas tecnologias web para criar uma aplicação robusta e escalável. A aplicação foi construída utilizando TypeScript e Nest.js, com armazenamento de imagens no serviço AWS S3, utilizando Prisma como ORM e MongoDB como banco de dados. O projeto está hospedado no Render e pode ser acessado [aqui](https://challenge-natura-frontend.vercel.app/).

## Tecnologias Utilizadas

- **TypeScript**: Superset do JavaScript que adiciona tipagem estática opcional ao JavaScript.
- **Nest.js**: Framework Node.js para construir aplicações server-side eficientes e escaláveis.
- **AWS S3**: Serviço de armazenamento em nuvem da Amazon Web Services utilizado para armazenar imagens.
- **Prisma**: ORM que facilita o gerenciamento do banco de dados.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os dados da aplicação.
- **Render**: Plataforma de hospedagem que facilita o deploy de aplicações web.

## Funcionalidades

- **Autenticação de Usuário**: Registro e login de usuários.
- **Gerenciamento de Produtos**: Adição, listagem e remoção de produtos.
- **Upload de Imagens**: Upload de imagens de produtos para o AWS S3.
- **Carrinho de Compras**: Funcionalidade de adicionar, remover e listar produtos no carrinho de compras.
- **Interface Responsiva**: Design responsivo para garantir uma boa experiência em dispositivos móveis e desktops.

## Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto localmente:

### Pré-requisitos

- Node.js instalado
- Gerenciador de pacotes Yarn ou NPM
- Conta na AWS com acesso ao S3
- MongoDB Atlas ou outra instância de MongoDB
- Configuração de variáveis de ambiente para AWS S3, Prisma e Render

### Passo a Passo

1. Clone o repositório:

    ```bash
    git clone https://github.com/devjonatasassis/challenge-natura-backend.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd challenge-natura-backend
    ```

3. Instale as dependências:

    ```bash
    yarn install
    ```

    ou

    ```bash
    npm install
    ```

4. Configure as variáveis de ambiente:

    Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

    ```bash
    DATABASE_URL=""
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_BUCKET_NAME=
    AWS_REGION=
    JWT_CHECK_IN_TOKEN_SECRET=
    ```

5. Execute as migrações do Prisma para configurar o banco de dados:

    ```bash
    npx prisma migrate dev --name init
    ```

6. Execute o projeto:

    ```bash
    yarn start:dev
    ```

    ou

    ```bash
    npm run start:dev
    ```

7. Abra seu navegador e acesse:

    ```bash
    http://localhost:3000
    ```

## Funcionalidades Implementadas

### Autenticação

- Registro de Usuário
- Login de Usuário

### Produtos

- Adição de Produtos
- Listagem de Produtos
- Remoção de Produtos
- Upload de Imagens para AWS S3

### Carrinho de Compras

- Adicionar Produto ao Carrinho
- Remover Produto do Carrinho
- Listar Produtos no Carrinho
  
## Endpoints da API

### Autenticação

- **POST /session**
  - Descrição: Realiza login do usuário.
  - Corpo da Requisição:
    ```json
    {
      "email": "usuario@example.com",
      "password": "senha123"
    }
    ```
  - Resposta:
    ```json
    {
      "token": "token_de_autenticacao",
      "user": {
        "id": "1",
        "email": "usuario@example.com"
      }
    }
    ```

### Usuários

- **POST /users**
  - Descrição: Registra um novo usuário.
  - Corpo da Requisição:
    ```json
    {
      "email": "usuario@example.com",
      "password": "senha123",
      "name": "Nome do Usuário"
    }
    ```
  - Resposta:
    ```json
    {
      "id": "1",
      "email": "usuario@example.com",
      "name": "Nome do Usuário"
    }
    ```

### Produtos

- **POST /products**
  - Descrição: Adiciona um novo produto.
  - Corpo da Requisição:
    ```json
    {
      "name": "Produto 1",
      "price": 100,
      "description": "Descrição do produto",
      "categoryId": "1"
    }
    ```
  - Resposta:
    ```json
    {
      "id": "1",
      "name": "Produto 1",
      "price": 100,
      "description": "Descrição do produto",
      "categoryId": "1",
      "image": "nome_do_arquivo.jpg"
    }
    ```

- **GET /products**
  - Descrição: Lista todos os produtos.
  - Parâmetros de Consulta:
    - `name`: (opcional) Filtra produtos pelo nome.
    - `skip`: (opcional) Número de registros a pular para paginação.
    - `take`: (opcional) Número de registros a retornar para paginação.
  - Resposta:
    ```json
    [
      {
        "id": "1",
        "name": "Produto 1",
        "price": 100,
        "description": "Descrição do produto",
        "categoryId": "1",
        "image": "nome_do_arquivo.jpg"
      },
      
    ]
    ```

- **GET /products/:id**
  - Descrição: Retorna os detalhes de um produto pelo ID.
  - Resposta:
    ```json
    {
      "id": "1",
      "name": "Produto 1",
      "price": 100,
      "description": "Descrição do produto",
      "categoryId": "1",
      "image": "nome_do_arquivo.jpg"
    }
    ```

- **DELETE /products/:id**
  - Descrição: Remove um produto pelo ID.
  - Resposta:
    ```json
    {
      "id": "1",
      "name": "Produto 1",
      "price": 100,
      "description": "Descrição do produto",
      "categoryId": "1",
      "image": "nome_do_arquivo.jpg"
    }
    ```

### Carrinho de Compras

- **POST /cart**
  - Descrição: Adiciona um produto ao carrinho.
  - Corpo da Requisição:
    ```json
    {
      "userId": "1",
      "productId": "1",
      "quantity": 2
    }
    ```
  - Resposta:
    ```json
    {
      "id": "1",
      "userId": "1",
      "productId": "1",
      "quantity": 2
    }
    ```

- **GET /cart/:userId**
  - Descrição: Retorna os produtos do carrinho de um usuário.
  - Resposta:
    ```json
    [
      {
        "id": "1",
        "userId": "1",
        "productId": "1",
        "quantity": 2,
        "product": {
          "id": "1",
          "name": "Produto 1",
          "price": 100,
          "description": "Descrição do produto",
          "categoryId": "1",
          "image": "nome_do_arquivo.jpg"
        }
      },
      
    ]
    ```

- **DELETE /cart/:id**
  - Descrição: Remove um produto do carrinho pelo ID.
  - Resposta:
    ```json
    {
      "id": "1",
      "userId": "1",
      "productId": "1",
      "quantity": 2
    }

## Hospedagem

O projeto está hospedado no Render e pode ser acessado através do link: [API URL](https://challenge-natura-api.onrender.cOm)

## Contato

Se você tiver alguma dúvida ou sugestão, entre em contato:

- Email: devjonatasassis@gmail.com
- Whatsapp: (44)998330366
- LinkedIn: https://www.linkedin.com/in/jonatasassis/
