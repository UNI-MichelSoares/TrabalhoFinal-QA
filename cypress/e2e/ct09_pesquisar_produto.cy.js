describe('CT09 - Search Product', () => {
  it('Deve pesquisar um produto e exibir os resultados relacionados', () => {
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
