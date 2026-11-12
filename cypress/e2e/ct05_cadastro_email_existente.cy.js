describe('CT05 - Register User with existing email', () => {
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

  it('Deve exibir erro ao cadastrar usuário com e-mail já existente', () => {
    cy.visitarURL();
    cy.acessarMenu('/login');
    cy.preencherCadastroInicial(usuario.nome, usuario.email);

    cy.contains('.signup-form p', 'Email Address already exist!').should('be.visible');
    cy.url().should('include', '/signup');
  });
});
