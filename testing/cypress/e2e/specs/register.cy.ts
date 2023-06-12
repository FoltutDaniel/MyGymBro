import { random } from "cypress/types/lodash";
import { interceptConstants } from "../../helpers/interceptConstants";
import LandingPage from "../../pages/LandingPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage"

describe('Register test scenarios', () => {
    const url = Cypress.env('URL');
    const username = 'test12'
    const email = 'test@test12.com'
    const pass = 'test123'
    let newUsername
    let newEmail
    const newPass = 'password'
    const wrongusername = 'us'
    const wrongemail = 'test'
    const wrongpass = 'pass'

    beforeEach(()=>{
        cy.visit(`${url}/#/landing`)
        LandingPage.registerBtn.click()
    })

    it('Register page verification', () => {
        RegisterPage.verifyRegister()
    })

    it('Sign up with a new account', () => {
        newUsername = 'user'+ Cypress._.random(0, 100)
        newEmail = 'test' + Cypress._.random(0, 100) + '@test.com'
        RegisterPage.register(newUsername, newEmail, newPass)
        cy.url().should('contain','/login')
    })

    it('Sign up and sign in with a new account', () => {
        newUsername = 'user'+ Cypress._.random(0, 100)
        newEmail = 'test' + Cypress._.random(0, 100) + '@test.com'
        RegisterPage.register(newUsername, newEmail, newPass)
        cy.url().should('contain','/login')
        LoginPage.login(newEmail, newPass)
        cy.url().should('not.contain','/login')
    })

    it('Sign up with an existing account', () => {
        RegisterPage.register(username, email, pass)
        RegisterPage.verifyAlreadyExistError()
    })

    it('Sign up with an invalid username', () => {
        RegisterPage.register(wrongusername, email, pass)
        RegisterPage.verifyUsernameError()
    })

    it('Sign up with an invalid email', () => {
        RegisterPage.register(username, wrongemail, pass)
        RegisterPage.verifyEmailError()
    })

    it('Sign up with an invalid password', () => {
        RegisterPage.register(username, email, wrongpass)
        RegisterPage.verifyPassError()
    })

    it('Sign up with an invalid username, email and password', () => {
        RegisterPage.register(wrongusername, wrongemail, wrongpass)
        RegisterPage.verifyUsernameError()
        cy.reload()
        RegisterPage.register(username, email, wrongpass)
        RegisterPage.verifyPassError()
        cy.reload()
        RegisterPage.register(username, wrongemail, pass)
        RegisterPage.verifyEmailError()
    })
})