describe('Login', () => {
  
  beforeEach( ()=> {
    // Arrange
    cy.visit('http://localhost:4000')
  })

  it('Deve acessar o sistemas com credenciais validas', () => {
    // Act
    cy.fixture("credenciais").then( (credenciais)=> {
      cy.get('#username')
        .click()
        .type(credenciais.valida.username, { log: false})

      cy.get('#senha')
        .click()
        .type(credenciais.valida.senha, { log: false})

      cy.get('button')
        .contains('Entrar')
        .click() 
      
      // Assert
      cy.contains('h4', 'Realizar Transferência').should('be.visible')
    })
  })

  it('Deve exibir mensagem de erro quando informado credenciais inválidas', () => {
    // Act
    cy.fixture('credenciais').then( (credenciais) =>{
      cy.get('#username')
      .click()
      .type(credenciais.invalida.username)

      cy.get('#senha')
        .click()
        .type(credenciais.invalida.senha)

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

})