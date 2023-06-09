import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage"

describe('Register test scenarios', () => {
    const url = Cypress.env('URL');

    beforeEach(()=>{
        cy.visit(`${url}/#/auth/register`)
    })

    it('Register page verification', () => {
        RegisterPage.verifyRegister()
    })

    it('Sign up with a new account', () => {
        RegisterPage.signUp('testuser', 'test@test.com', 'password')
    })

    it('Sign up with a new account and sign in with that account', () => {
        RegisterPage.signUp('testuser', 'test@test.com', 'password')
        LoginPage.login('test@test.com', 'password')
    })

    it('Sign up with an existing email', () => {})

    it('Sign up with an existing username', () => {})

})