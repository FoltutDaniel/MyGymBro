describe('Cypress first test', () => {
    it('Cypress', () => {
    cy.visit('https://docs.cypress.io/guides/overview/why-cypress')
    cy.get('.headerWrapper_tu51').should('have.text','Why Cypress?')
    });
});