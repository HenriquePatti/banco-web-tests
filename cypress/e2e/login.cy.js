describe('Login', () => {
  it('Deve acessar o sistemas com credenciais validas', () => {
    // Arrange
    cy.visit('http://localhost:4000')
       
    // Act
    cy.get('#username')
      .click()
      .type('julio.lima')

    cy.get('#senha')
      .click()
      .type('123456')

    cy.get('button')
      .contains('Entrar')
      .click() 
      
    // Assert
    cy.contains('h4', 'Realizar Transferência').should('be.visible')

  })
})