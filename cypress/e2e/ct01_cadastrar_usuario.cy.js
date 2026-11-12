describe('CT01 - Register User', () => {
  let usuario;

  beforeEach(() => {
    cy.gerarUsuario().then((dados) => {
      usuario = dados;
    });
  });

  afterEach(() => {
    cy.excluirUsuarioViaApi(usuario);
  });

  it('Deve cadastrar um novo usuário e excluir a conta com sucesso', () => {
    cy.visitarURL();
    cy.acessarMenu('/login');
    cy.preencherCadastroInicial(usuario.nome, usuario.email);
    cy.preencherInformacoesConta(usuario);

    cy.get('[data-qa="account-created"]').should('be.visible').and('contain', 'Account Created!');
    cy.get('[data-qa="continue-button"]').click();
    cy.validarUsuarioLogado(usuario.nome);

    cy.excluirContaPelaTela();
  });
});
