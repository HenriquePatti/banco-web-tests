describe("Transferências", () => {
  beforeEach(() => {
    const username = Cypress.env("USERNAME")
    const senha = Cypress.env("PASSWORD")

    cy.visit("/");
    cy.get("#username").click().type(username, { log: false })
    cy.get("#senha").click().type(senha, { log: false })
    cy.get("button").contains("Entrar").click()
  });

  it("Deve realizar uma transferência com sucesso", () => {
    const contaOrigem = 'João'
    const contaDestino = 'Maria'

    cy.get('label[for="conta-origem"]')
      .parents(".input-field")
      .as("select-contaOrigem")
    cy.get("@select-contaOrigem").click().contains(contaOrigem).click()

    cy.get('label[for="conta-destino"]')
      .parents(".input-field")
      .as("select-contaDestino")
    cy.get("@select-contaDestino").click().contains(contaDestino).click()

    cy.get("#valor").type("100")

    cy.clock();
    cy.intercept("POST", "/bff/transferencia").as("XHR-novaTransferencia")
    cy.get("button").contains("Transferir").click();
    cy.wait("@XHR-novaTransferencia")
      .its("response.statusCode")
      .should("eq", 200)

    cy.get(".toast")
      .should("contain", "Transferência realizada!")
      .and("be.visible")

    cy.tick(5000);
    cy.get(".toast").should("not.exist")
  });
});
