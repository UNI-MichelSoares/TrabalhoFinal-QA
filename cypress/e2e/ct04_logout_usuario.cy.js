describe('CT04 - Logout User', () => {
  let usuario;

  beforeEach(() => {
    cy.gerarUsuario().then((dados) => {
      usuario = dados;
      cy.criarUsuarioViaApi(usuario);
    });
  });

  afterEach(() => {
    cy.excluirUsuarioViaApi(usuario);
  });

  it('Deve realizar logout e retornar para a página de login', () => {
    cy.visitarURL();
    cy.acessarMenu('/login');
    cy.realizarLogin(usuario.email, usuario.senha);
    cy.validarUsuarioLogado(usuario.nome);

    cy.get('#header a[href="/logout"]').click();

    cy.url().should('include', '/login');
    cy.contains('.login-form h2', 'Login to your account').should('be.visible');
    cy.get('#header').should('not.contain', 'Logged in as');
  });
});
