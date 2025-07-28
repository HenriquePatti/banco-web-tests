describe("Login", () => {
  beforeEach(() => {
    // Arrange
    cy.visit('/');
  });

  it("Deve acessar o sistemas com credenciais validas", () => {
    // Act
    const username = Cypress.env('USERNAME');
    const senha = Cypress.env('PASSWORD');
    
      cy.get("#username")
        .click()
        .type(username, { log: false });

      cy.get("#senha")
      .click()
      .type(senha, { log: false });

      cy.get("button")
        .contains("Entrar")
        .click();

      // Assert
      cy.contains("h4", "Realizar Transferência").should("be.visible");
  
  });

  it("Deve exibir mensagem de erro quando informado credenciais inválidas", () => {
    // Act
    const username = Cypress.env('USERNAME');
    const senha = Math.random().toString(10).substring(2, 10)
    
      cy.get("#username")
        .click()
        .type(username);

      cy.get("#senha")
        .click()
        .type(senha);

      cy.clock();
        cy.get("button")
          .contains("Entrar")
          .click();

      // Assert
      cy.get("#toast-container")
        .should("have.text", "Erro no login. Tente novamente.")
        .and("be.visible");

      cy.tick(5000);
        cy.get("#toast-container")
        .should("not.exist");
  
  });
});
