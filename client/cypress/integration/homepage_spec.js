describe('homepage', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000')
    cy.log("hithere")
    cy.contains('Login with Google').click()
  })
})
