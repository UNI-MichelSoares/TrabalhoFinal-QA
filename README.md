# Trabalho Final - Automação de Testes com Cypress

Disciplina: **Qualidade e Teste de Software**
Professor: **Allan Gonçalves da Silva Teixeira**

## Integrantes

- Michel Soares
- João Victor Carrete
- Breno Guimarães

## Objetivo

Automatizar 10 cenários de teste do site [Automation Exercise](https://www.automationexercise.com/test_cases) com o framework Cypress, seguindo a estrutura do projeto de exemplo SauceDemo visto em aula.

## Cenários automatizados

Cada cenário possui a sua própria spec. O número do CT corresponde ao número do Test Case no site (CT01 = Test Case 1, CT02 = Test Case 2, e assim por diante).

| ID   | Test Case do site                                         | Arquivo                                            |
|------|-----------------------------------------------------------|----------------------------------------------------|
| CT01 | Test Case 1: Register User                                | `cypress/e2e/ct01_cadastrar_usuario.cy.js`          |
| CT02 | Test Case 2: Login User with correct email and password   | `cypress/e2e/ct02_login_credenciais_validas.cy.js`  |
| CT03 | Test Case 3: Login User with incorrect email and password | `cypress/e2e/ct03_login_credenciais_invalidas.cy.js` |
| CT04 | Test Case 4: Logout User                                  | `cypress/e2e/ct04_logout_usuario.cy.js`             |
| CT05 | Test Case 5: Register User with existing email            | `cypress/e2e/ct05_cadastro_email_existente.cy.js`   |
| CT06 | Test Case 6: Contact Us Form                              | `cypress/e2e/ct06_formulario_contato.cy.js`         |
| CT07 | Test Case 7: Verify Test Cases Page                       | `cypress/e2e/ct07_pagina_test_cases.cy.js`          |
| CT08 | Test Case 8: Verify All Products and product detail page  | `cypress/e2e/ct08_produtos_e_detalhes.cy.js`        |
| CT09 | Test Case 9: Search Product                               | `cypress/e2e/ct09_pesquisar_produto.cy.js`          |
| CT10 | Test Case 10: Verify Subscription in home page            | `cypress/e2e/ct10_inscricao_newsletter.cy.js`       |

## Estrutura do projeto

```
TrabalhoFinal-QA/
├── cypress/
│   ├── e2e/                      Uma spec por cenário de teste (ct01 a ct10)
│   ├── fixtures/                 Massas de dados (usuário, contato, produtos, arquivo de upload)
│   └── support/
│       ├── commands.js           Comandos gerais (acesso ao site, navegação, bloqueio de anúncios)
│       ├── usuario_commands.js   Comandos de cadastro, login e exclusão de conta
│       ├── contato_commands.js   Comandos do formulário Contact Us
│       ├── produtos_commands.js  Comandos de listagem e pesquisa de produtos
│       └── e2e.js                Importação dos comandos
├── cypress.config.js
├── package.json
└── README.md
```

## Metodologia: FIRST

Os testes foram escritos seguindo os princípios **FIRST**:

- **Fast (Rápido):** pré-condições como "usuário já cadastrado" são criadas pela API do site (`/api/createAccount`) em vez da interface, e scripts de anúncios são bloqueados para acelerar o carregamento.
- **Independent (Independente):** cada teste cria a sua própria massa de dados no `beforeEach` e a remove no `afterEach` (`/api/deleteAccount`). Nenhum teste depende do resultado ou da ordem de outro, e qualquer arquivo pode ser executado sozinho.
- **Repeatable (Repetível):** os e-mails são gerados de forma única a cada execução, então os testes podem ser executados quantas vezes forem necessárias, em qualquer máquina, sem conflito de dados.
- **Self-validating (Autovalidável):** cada cenário termina com asserções explícitas (`should` / `expect`) que definem sozinhas se o teste passou ou falhou, sem verificação manual.
- **Timely (Oportuno):** os cenários cobrem os fluxos descritos nos Test Cases do site e foram escritos junto com o mapeamento de cada passo, com comandos customizados reutilizáveis que facilitam a criação de novos testes.

## Como executar

Pré-requisito: [Node.js](https://nodejs.org/) 18 ou superior.

```bash
npm install
```

Abrir a interface do Cypress:

```bash
npm run cypress:open
```

Executar todos os testes em modo headless:

```bash
npm test
```

Executar um único arquivo:

```bash
npx cypress run --spec cypress/e2e/ct02_login_credenciais_validas.cy.js
```
