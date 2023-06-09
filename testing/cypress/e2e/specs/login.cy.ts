import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage"

describe('Login test scenarios', () => {
    const url = Cypress.env('URL');

    beforeEach(()=>{
        cy.visit(`${url}#/auth/login`)
    })

    it('Login page verification', () => {
        LoginPage.verifyLogin()
    })

    it('Existing account - Login with correct username and password', () => {
        LoginPage.login('test@test.com', 'password')
    })

    // it('Login and logout from the account', () => {
    //     LoginPage.login('test@test.com', 'password')
    //     HomePage.profileBtn.click()
    //     HomePage.signOutBtn.click()
    //     // cy.url().should('contain', '/landing')
    // })

    // it('Existing account - Login with incorrect username and correct password', () => {})

    // it('Existing account - Login with correct username and incorrectpassword', () => {})

    // it('Login with a non-existing account', () => {})

})