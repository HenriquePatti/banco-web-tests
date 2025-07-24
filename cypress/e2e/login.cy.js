describe('Login', () => {
  
  beforeEach( ()=> {
    // Arrange
    cy.visit('http://localhost:4000')
  })

  it('Deve acessar o sistemas com credenciais validas', () => {
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

  it('Deve exibir mensagem de erro quando informado credenciais inválidas', () => {
    // Act
    cy.get('#username')
      .click()
      .type('julio.lima')

    cy.get('#senha')
      .click()
      .type('12567')

    cy.clock()
    cy.get('button')
      .contains('Entrar')
      .click()  

    // Assert
    cy.get('#toast-container')
      .should('have.text', 'Erro no login. Tente novamente.')
      .and('be.visible')

    cy.tick(5000)
    cy.get('#toast-container')
      .should('not.exist')
  
  })
})