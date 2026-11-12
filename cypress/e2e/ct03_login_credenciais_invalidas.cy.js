describe('CT03 - Login User with incorrect email and password', () => {
  it('Deve exibir erro ao realizar login com e-mail e senha incorretos', () => {
    cy.fixture('credenciais_invalidas').then((credenciais) => {
      cy.visitarURL();
      cy.acessarMenu('/login');
      cy.realizarLogin(credenciais.email, credenciais.senha);

      cy.contains('.login-form p', 'Your email or password is incorrect!').should('be.visible');
      cy.url().should('include', '/login');
    });
  });
});
