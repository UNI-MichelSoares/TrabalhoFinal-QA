describe('Funcionalidade de Cadastro de Usuário', () => {

  context('CT01 - Test Case 1: Register User', () => {
    let usuario;

    beforeEach(() => {
      cy.gerarUsuario().then((dados) => {
        usuario = dados;
      });
    });

    afterEach(() => {
      cy.excluirUsuarioViaApi(usuario);
    });

    it('CT01 - Deve cadastrar um novo usuário e excluir a conta com sucesso', () => {
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

  context('CT05 - Test Case 5: Register User with existing email', () => {
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

    it('CT05 - Deve exibir erro ao cadastrar usuário com e-mail já existente', () => {
      cy.visitarURL();
      cy.acessarMenu('/login');
      cy.preencherCadastroInicial(usuario.nome, usuario.email);

      cy.contains('.signup-form p', 'Email Address already exist!').should('be.visible');
      cy.url().should('include', '/signup');
    });
  });

});
