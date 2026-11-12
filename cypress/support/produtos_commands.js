Cypress.Commands.add('validarPaginaTodosProdutos', () => {
    cy.url().should('include', '/products');
    cy.contains('.features_items h2.title', 'All Products').should('be.visible');
})

Cypress.Commands.add('pesquisarProduto', (termo) => {
    cy.get('#search_product').type(termo);
    cy.get('#submit_search').click();
})

Cypress.Commands.add('buscarProdutosViaApi', (termo) => {
    return cy.request({
        method: 'POST',
        url: '/api/searchProduct',
        form: true,
        body: { search_product: termo }
    }).then((resposta) => {
        const corpo = typeof resposta.body === 'string' ? JSON.parse(resposta.body) : resposta.body;
        expect(corpo.responseCode).to.eq(200);
        return corpo.products.map((produto) => produto.name);
    });
})
