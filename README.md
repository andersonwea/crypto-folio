# App

Crypto Folio app

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível adicionar uma crypto à lista de interesse;
- [x] Deve ser possível obter o perfil do usuário logado;
- [ ] Deve ser possível detalhar uma crypto;
- [ ] Deve ser possível o usuário filtrar seus ativos;
- [ ] Deve ser possível o usuário atualizar seu perfil;
- [ ] Deve ser possível o usuário criar uma transação de compra ou venda;
- [ ] Deve ser possível o usuário obter seu histórico de transações;
- [ ] Deve ser possível o usuário obter o resumo do seu portfolio;

## Rns (Regra de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não deve poder cadastrar uma transação de venda sem ter uma de compra no ativo;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] O usuário deve se identificado por um JWT (JSON Web Token);
- [ ] Os dados dos ativos virão de uma API externa;