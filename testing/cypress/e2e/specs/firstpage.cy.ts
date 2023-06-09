import HomePage from "../../pages/HomePage";

describe('Cypress first test', () => {

    beforeEach(()=>{
        cy.visit('/')
    })

    it('Verify default/first page', () => {
        // HomePage.verifyDefaultPage()
    });
});