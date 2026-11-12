describe('Funcionalidade de Autenticação', () => {

  context('Usuário cadastrado', () => {
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

    it('CT02 - Test Case 2: Deve realizar login com e-mail e senha corretos', () => {
      cy.visitarURL();
      cy.acessarMenu('/login');
      cy.realizarLogin(usuario.email, usuario.senha);

      cy.validarUsuarioLogado(usuario.nome);
      cy.excluirContaPelaTela();
    });

    it('CT04 - Test Case 4: Deve realizar logout e retornar para a página de login', () => {
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

  context('Usuário não cadastrado', () => {

    it('CT03 - Test Case 3: Deve exibir erro ao realizar login com e-mail e senha incorretos', () => {
      cy.fixture('credenciais_invalidas').then((credenciais) => {
        cy.visitarURL();
        cy.acessarMenu('/login');
        cy.realizarLogin(credenciais.email, credenciais.senha);

        cy.contains('.login-form p', 'Your email or password is incorrect!').should('be.visible');
        cy.url().should('include', '/login');
      });
    });
  });

});
