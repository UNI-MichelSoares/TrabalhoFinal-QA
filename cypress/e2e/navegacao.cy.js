describe('Funcionalidade de Navegação', () => {

  it('CT07 - Test Case 7: Deve navegar para a página de Test Cases com sucesso', () => {
    cy.visitarURL();
    cy.acessarMenu('/test_cases');

    cy.url().should('include', '/test_cases');
    cy.contains('h2.title b', 'Test Cases').should('be.visible');
    cy.contains('Test Case 1: Register User').should('be.visible');
  });

});
