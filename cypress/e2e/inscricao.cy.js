describe('Funcionalidade de Inscrição na Newsletter', () => {

  it('CT10 - Test Case 10: Deve realizar a inscrição pelo rodapé da página inicial', () => {
    const email = `inscricao.${Date.now()}@teste.com`;

    cy.visitarURL();
    cy.get('#footer').scrollIntoView();

    cy.contains('#footer h2', 'Subscription').should('be.visible');
    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();

    cy.get('#success-subscribe')
      .should('be.visible')
      .and('contain', 'You have been successfully subscribed!');
  });

});
