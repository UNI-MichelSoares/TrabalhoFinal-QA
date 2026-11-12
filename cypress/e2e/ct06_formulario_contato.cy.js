describe('CT06 - Contact Us Form', () => {
  it('Deve enviar o formulário Contact Us com arquivo anexado', () => {
    cy.fixture('contato').then((contato) => {
      cy.visitarURL();
      cy.acessarMenu('/contact_us');
      cy.preencherFormularioContato(contato);

      cy.window().then((janela) => {
        cy.stub(janela, 'confirm').as('confirmacao').returns(true);
      });
      cy.get('[data-qa="submit-button"]').click();

      cy.get('@confirmacao').should('have.been.calledOnceWith', 'Press OK to proceed!');
      cy.get('#contact-page .status.alert-success')
        .should('be.visible')
        .and('contain', 'Success! Your details have been submitted successfully.');

      cy.get('#form-section a.btn-success').click();
      cy.validarHomeVisivel();
    });
  });
});
