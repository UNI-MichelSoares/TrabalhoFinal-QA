describe('Funcionalidade de Produtos', () => {

  it('CT08 - Test Case 8: Deve exibir todos os produtos e os detalhes do primeiro produto', () => {
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

  it('CT09 - Test Case 9: Deve pesquisar um produto e exibir os resultados relacionados', () => {
    cy.fixture('produtos').then(({ termoPesquisa }) => {
      cy.buscarProdutosViaApi(termoPesquisa).then((produtosEsperados) => {
        cy.visitarURL();
        cy.acessarMenu('/products');
        cy.validarPaginaTodosProdutos();
        cy.pesquisarProduto(termoPesquisa);

        cy.url().should('include', `search=${termoPesquisa}`);
        cy.contains('.features_items h2.title', 'Searched Products').should('be.visible');
        cy.get('.features_items .productinfo p')
          .should('have.length', produtosEsperados.length)
          .then((nomes) => {
            const nomesExibidos = Cypress._.map(nomes, (nome) => nome.innerText.trim());
            expect(nomesExibidos).to.have.members(produtosEsperados);
          });
        cy.get('.features_items .product-image-wrapper').each((produto) => {
          cy.wrap(produto).should('be.visible');
        });
      });
    });
  });

});
