describe('CT08 - Verify All Products and product detail page', () => {
  it('Deve exibir todos os produtos e os detalhes do primeiro produto', () => {
    cy.visitarURL();
    cy.acessarMenu('/products');
    cy.validarPaginaTodosProdutos();

    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0).and('be.visible');
    cy.get('.features_items .choose a').first().click();

    cy.url().should('include', '/product_details/1');
    cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible').and('not.be.empty');
      cy.contains('p', 'Category:').should('be.visible');
      cy.contains('span span', 'Rs.').should('be.visible');
      cy.contains('p', 'Availability:').should('be.visible');
      cy.contains('p', 'Condition:').should('be.visible');
      cy.contains('p', 'Brand:').should('be.visible');
    });
  });
});
