Cypress.Commands.add('gerarUsuario', () => {
    return cy.fixture('usuario').then((dados) => {
        const identificador = `${Date.now()}${Cypress._.random(1000, 9999)}`;
        return { ...dados, email: `qa.${identificador}@teste.com` };
    });
})

Cypress.Commands.add('criarUsuarioViaApi', (usuario) => {
    cy.request({
        method: 'POST',
        url: '/api/createAccount',
        form: true,
        body: {
            name: usuario.nome,
            email: usuario.email,
            password: usuario.senha,
            title: usuario.titulo,
            birth_date: usuario.diaNascimento,
            birth_month: usuario.mesNascimento,
            birth_year: usuario.anoNascimento,
            firstname: usuario.primeiroNome,
            lastname: usuario.sobrenome,
            company: usuario.empresa,
            address1: usuario.endereco,
            address2: usuario.complemento,
            country: usuario.pais,
            zipcode: usuario.cep,
            state: usuario.estado,
            city: usuario.cidade,
            mobile_number: usuario.celular
        }
    }).then((resposta) => {
        const corpo = typeof resposta.body === 'string' ? JSON.parse(resposta.body) : resposta.body;
        expect(corpo.responseCode).to.eq(201);
    });
})

Cypress.Commands.add('excluirUsuarioViaApi', (usuario) => {
    cy.request({
        method: 'DELETE',
        url: '/api/deleteAccount',
        form: true,
        failOnStatusCode: false,
        body: {
            email: usuario.email,
            password: usuario.senha
        }
    });
})

Cypress.Commands.add('preencherCadastroInicial', (nome, email) => {
    cy.contains('.signup-form h2', 'New User Signup!').should('be.visible');
    cy.get('[data-qa="signup-name"]').type(nome);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
})

Cypress.Commands.add('preencherInformacoesConta', (usuario) => {
    cy.contains('h2.title', 'Enter Account Information').should('be.visible');
    cy.get(usuario.titulo === 'Mrs' ? '#id_gender2' : '#id_gender1').check();
    cy.get('[data-qa="name"]').should('have.value', usuario.nome);
    cy.get('[data-qa="email"]').should('have.value', usuario.email);
    cy.get('[data-qa="password"]').type(usuario.senha, { log: false });
    cy.get('[data-qa="days"]').select(usuario.diaNascimento);
    cy.get('[data-qa="months"]').select(usuario.mesNascimento);
    cy.get('[data-qa="years"]').select(usuario.anoNascimento);
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    cy.get('[data-qa="first_name"]').type(usuario.primeiroNome);
    cy.get('[data-qa="last_name"]').type(usuario.sobrenome);
    cy.get('[data-qa="company"]').type(usuario.empresa);
    cy.get('[data-qa="address"]').type(usuario.endereco);
    cy.get('[data-qa="address2"]').type(usuario.complemento);
    cy.get('[data-qa="country"]').select(usuario.pais);
    cy.get('[data-qa="state"]').type(usuario.estado);
    cy.get('[data-qa="city"]').type(usuario.cidade);
    cy.get('[data-qa="zipcode"]').type(usuario.cep);
    cy.get('[data-qa="mobile_number"]').type(usuario.celular);
    cy.get('[data-qa="create-account"]').click();
})

Cypress.Commands.add('realizarLogin', (email, senha) => {
    cy.contains('.login-form h2', 'Login to your account').should('be.visible');
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(senha, { log: false });
    cy.get('[data-qa="login-button"]').click();
})

Cypress.Commands.add('validarUsuarioLogado', (nome) => {
    cy.contains('#header a', 'Logged in as').should('be.visible').find('b').should('have.text', nome);
})

Cypress.Commands.add('excluirContaPelaTela', () => {
    cy.get('#header a[href="/delete_account"]').click();
    cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain', 'Account Deleted!');
    cy.get('[data-qa="continue-button"]').click();
})
