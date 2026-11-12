describe('CT02 - Login User with correct email and password', () => {
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

  it('Deve realizar login com e-mail e senha corretos', () => {
    cy.visitarURL();
    cy.acessarMenu('/login');
    cy.realizarLogin(usuario.email, usuario.senha);

    cy.validarUsuarioLogado(usuario.nome);
    cy.excluirContaPelaTela();
  });
});
