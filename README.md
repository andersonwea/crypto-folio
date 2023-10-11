# App

Crypto Folio app

## Docs
https://app.theneo.io/11f4c935-b4e8-45cc-857a-90c1b34ea750/crypto-folio-3

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível adicionar uma crypto à lista de interesse;
- [x] Deve ser possível obter o perfil do usuário logado;
- [x] Deve ser possível detalhar uma crypto;
- [x] Deve ser possível o usuário filtrar seus ativos;
- [x] Deve ser possível o usuário atualizar seu perfil;
- [x] Deve ser possível o usuário criar uma transação de compra ou venda;
- [x] Deve ser possível o usuário obter seu histórico de transações;
- [x] Deve ser possível o usuário obter o resumo do seu portfolio;
- [x] Deve ser possível o usuário adicionar foto de perfil;

## Rns (Regra de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não deve poder cadastrar uma transação de venda sem ter uma de compra no ativo;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] O usuário deve se identificado por um JWT (JSON Web Token);
- [x] Os dados dos ativos virão de uma API externa;
- [x] Dar update no amount da model currencies com o valor total dos amounts da model transaction;
- [x] A foto de perfil do usuário deve ser armazenada em um bucket;