describe("myfirst test", () => {
  it('clicks on type', () => {
    cy.visit('https://example.cypress.io')
    cy.pause()
    cy.contains('type').click()
    cy.url()
      .should('include', '/commands/actions')
    cy.get('.action-email')
      .type("fake@gmail.com")
      .should('have.value', 'fake@gmail.com')
  })
})
