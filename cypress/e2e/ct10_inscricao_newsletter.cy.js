describe('CT10 - Verify Subscription in home page', () => {
  it('Deve realizar a inscrição pelo rodapé da página inicial', () => {
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
