import AccountDataPage from "../../pages/AccountDataPage";
import HomePage from "../../pages/HomePage";
import LandingPage from "../../pages/LandingPage";
import LoginPage from "../../pages/LoginPage"

describe('Login test scenarios', () => {
    const url = Cypress.env('URL');
    const email = 'test@test12.com'
    const pass = 'test123'
    const incorrectEmail = 'test@test.com'
    const incorrectPass = 'wrongpass'
    const newPass = 'newpassword'

    beforeEach(()=>{
        cy.visit(`${url}#/landing`)
    })

    it('Login page verification', () => {
        LandingPage.loginBtn.click()
        LoginPage.verifyLogin()
    })

    it('Existing account - Login with correct username and password', () => {
        LandingPage.loginBtn.click()
        LoginPage.login(email, pass)
        cy.url().should('not.contain','/login')
    })

    it('Login and logout from the account', () => {
        LandingPage.loginBtn.click()
        LoginPage.login(email, pass)
        cy.url().should('not.contain','/login')
        HomePage.profileBtn.click()
        HomePage.signOutBtn.click()
        cy.url().should('contain', '/landing')
    })

    it('Login with a non-existing account', () => {
        LandingPage.loginBtn.click()
        LoginPage.login(incorrectEmail, incorrectPass)
        cy.url().should('contain', '/login')
        LoginPage.verifyErrorMessage()
    })

    it('Login with incorrect email', () => {
        LandingPage.loginBtn.click()
        LoginPage.login(incorrectEmail, pass)
        cy.url().should('contain', '/login')
        LoginPage.verifyErrorMessage() 
    })

    it('Login with incorrect password', () => {
        LandingPage.loginBtn.click()
        LoginPage.login(email, incorrectPass)
        cy.url().should('contain', '/login')
        LoginPage.verifyErrorMessage()
    })

    it('Change password', () => {
        LandingPage.loginBtn.click()
        LoginPage.login(email, pass)
        cy.url().should('not.contain','/login')
        HomePage.profileBtn.click()
        HomePage.accountDataBtn.click()
        AccountDataPage.changePassword(newPass)
        HomePage.profileBtn.click()
        HomePage.signOutBtn.click()
        LandingPage.loginBtn.click()
        LoginPage.login(email,newPass)
        cy.url().should('not.contain','/login')
        HomePage.profileBtn.click()
        HomePage.accountDataBtn.click()
        AccountDataPage.changePassword(pass)
        HomePage.profileBtn.click()
    })

})