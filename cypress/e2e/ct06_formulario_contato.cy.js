describe('CT06 - Contact Us Form', () => {
  it('Deve enviar o formulário Contact Us com arquivo anexado', () => {
    cy.fixture('contato').then((contato) => {
      cy.visitarURL();
      cy.acessarMenu('/contact_us');
      cy.preencherFormularioContato(contato);

      cy.on('window:confirm', (mensagem) => {
        expect(mensagem).to.eq('Press OK to proceed!');
        return true;
      });
      cy.get('[data-qa="submit-button"]').click();

      cy.get('#contact-page .status.alert-success')
        .should('be.visible')
        .and('contain', 'Success! Your details have been submitted successfully.');

      cy.get('#form-section a.btn-success').click();
      cy.validarHomeVisivel();
    });
  });
});
