
# Crypto Folio

Um aplicativo web para gerenciar sua carteira de cryptomoedas e acompanhar dados como preços, volumes de negociação e capitalização de mercado em criptomoedas

Você pode acessar o aplicativo em produção [AQUI](https://crypto-folio-beta.vercel.app)

## 🖥️ Screenshots

![App Screenshot](https://crypto-folio-bucket.s3.us-east-2.amazonaws.com/screenshost-app/dashboard-screen.png)

![App Screenshot](https://crypto-folio-bucket.s3.us-east-2.amazonaws.com/screenshost-app/market-screen.png)

![App Screenshot](https://crypto-folio-bucket.s3.us-east-2.amazonaws.com/screenshost-app/me-screen.png)

![App Screenshot](https://crypto-folio-bucket.s3.us-east-2.amazonaws.com/screenshost-app/wallet-screenpng.png)

![App Screenshot](https://crypto-folio-bucket.s3.us-east-2.amazonaws.com/screenshost-app/chart-screen.png)


## 🥁 Funcionalidades

- Adicionar cryptomoeda em sua carteira
- Adicionar e gerenciar transações
- Consultar saldo por cryptomoedas na carteira
- Consultar saldo da carteira e total investido
- Acompanhar preços e dados de criptomoedas no mercado


## 🛠️ Stack utilizada

**Front-end:** React, Next, TailwindCSS, NextUI, RadixUI, Zustand, Zod, NextAuth

**Back-end:** Node, Fastify, Prisma, PostgreSQL, Vitest, Zod


## 📕 Documentação da API

Para consultar a documentação da API acesse o link.
[Documentação](https://app.theneo.io/11f4c935-b4e8-45cc-857a-90c1b34ea750/crypto-folio-3/watchlist)


## ⚙️ Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

### Back-end
```env
# Banco de dados
DATABASE_URL=

# Api de consulta de preços
CRYPTO_RANK_API_KEY=

# JWT config
JWT_SECRET=

# AWS S3 config
APP_AWS_ACCESS_KEY_ID=
APP_AWS_SECRET_ACCESS_KEY=
APP_AWS_REGION=
APP_AWS_BUCKET_NAME=
APP_AWS_BASE_URL=
```
### Front-end
```env
# Back-end api url
NEXTBASE_URL=

# Next config
NEXTAUTH_SECRET=
```

## 🚀 Rodando localmente

### Back-end

Clone o projeto

```bash
  git clone https://github.com/andersonwea/crypto-folio
```

Entre no diretório do projeto

```bash
  cd crypto-folio/server
```

Instale as dependências

```bash
  npm install
```

Inicie o banco de dados
```bash
  docker compose up -d
```

Inicie o servidor

```bash
  npm run start:dev
```
### Front-end

Entre no diretório do projeto

```bash
  cd crypto-folio/web
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```
## 🧪 Rodando os testes

Para rodar os testes no Back-end, rode o seguinte comando

Testes unitários

```bash
  npm run test
```

Testes end to end

```bash
  npm run test:e2e
```


## 📝 Aprendizados

Desenvolvi este projeto totalmente do zero, abrangendo desde o design das telas até a elaboração dos requisitos e o processo de implantação. Obtive valiosos aprendizados durante essa experiência, demonstrando minha capacidade de lidar com projetos práticos.

Um dos desafios enfrentados foi a implementação da autenticação dos usuários na aplicação. Seguindo as boas práticas, desenvolvi um sistema de rotação de tokens, incorporando tanto tokens de acesso quanto tokens de refresh.

Outra dificuldade surgiu durante a implantação do servidor da aplicação, quando o tamanho da build do projeto excedeu o limite máximo de armazenamento no ambiente de deploy. Consegui superar esse obstáculo ao otimizar o script de deploy, removendo todos os testes e dependências de desenvolvimento desnecessárias para o ambiente de produção, resultando na redução do tamanho do projeto.


## 🔎 Referência

 - [Inspiração do design das telas](https://uikitfree.com/crypto-wallet-dashboard-ui-figma-design-template/)


## 📢 Feedback

Se você tiver algum feedback, por favor nos deixe saber por meio de andersonwea14@gmail.com


## 🛣️ Roadmap

- Implementar login pelo Google

- Implementar troca de câmbio

