Cypress.Commands.add('preencherFormularioContato', (contato) => {
    cy.contains('#contact-page h2.title', 'Get In Touch').should('be.visible');
    cy.get('[data-qa="name"]').type(contato.nome);
    cy.get('[data-qa="email"]').type(contato.email);
    cy.get('[data-qa="subject"]').type(contato.assunto);
    cy.get('[data-qa="message"]').type(contato.mensagem);
    cy.get('input[name="upload_file"]').selectFile(`cypress/fixtures/${contato.arquivo}`);
})
