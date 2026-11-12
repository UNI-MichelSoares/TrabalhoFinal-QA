Cypress.Commands.add('bloquearAnuncios', () => {
    const dominiosDeAnuncio = [
        '**googlesyndication.com/**',
        '**doubleclick.net/**',
        '**googleadservices.com/**',
        '**google-analytics.com/**',
        '**googletagmanager.com/**',
        '**fundingchoicesmessages.google.com/**',
        '**adtrafficquality.google/**'
    ];

    dominiosDeAnuncio.forEach((dominio) => {
        cy.intercept(dominio, { statusCode: 204, body: '' });
    });
})

Cypress.Commands.add('visitarURL', () => {
    cy.bloquearAnuncios();
    cy.visit('/');
    cy.validarHomeVisivel();
})

Cypress.Commands.add('validarHomeVisivel', () => {
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    cy.title().should('eq', 'Automation Exercise');
    cy.get('#slider').should('be.visible');
})

Cypress.Commands.add('acessarMenu', (rota) => {
    cy.get(`#header a[href="${rota}"]`).click();
})
