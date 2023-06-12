class RegisterPage{
    get registerSection(){
        return cy.get('.surface-card')
    }  

    get usernameInput(){
        return cy.get('#username')
    }

    get emailInput(){
        return cy.get('#email1')
    }

    get passwordInput(){
        return cy.get('#password1')
    }
    
    get signUpBtn(){
        return  cy.get('.p-button')
    }

    get passwordVerification(){
        return cy.get('.ng-trigger-overlayAnimation')
    }

    get piEye(){
        return cy.get('.pi')
    }

    get errorSection(){
        return cy.get('.p-toast-message-content')
    }

    get errorSummary(){
        return cy.get('.p-toast-summary')
    }

    get errorDetail(){
        return cy.get('.p-toast-detail')
    }

    verifyRegisterText(){
            // cy.get('.text-center > .mb-5').should('be.visible')
            cy.get('.text-center > .text-900').should('have.text', 'Welcome!')
            cy.get('.text-600').should('have.text', 'Sign up to continue')
    }

    verifyRegister(){
        this.registerSection.should('be.visible')
            this.verifyRegisterText()
            this.usernameInput.should('be.visible')
            this.emailInput.should('be.visible')
            this.passwordInput.should('be.visible')
            this.piEye.should('be.visible')
            this.signUpBtn.should('be.visible').should('have.text','Sign Up')
    }

    register(username: string, email: string, password: string){
        cy.url().should('contain', '/auth/register')
        this.usernameInput.click().type(username)
        this.emailInput.click().type(email)
        this.passwordInput.click().type(password)
        this.passwordVerification.should('be.visible') //add verification panel
        this.piEye.click()
        this.signUpBtn.click()
    }

    verifyError = () => {
        this.errorSection.should('be.visible')
        this.errorSummary.should('be.visible').should('have.text','Error')
    }

    verifyUsernameError = () => {
        this.verifyError()
        this.errorDetail.should('be.visible').should('have.text','Username must have 3 or more letters!')
    }

    verifyEmailError = () => {
        this.verifyError()
        this.errorDetail.should('be.visible').should('have.text','Email is invalid!')
    }

    verifyPassError = () => {
        this.verifyError()
        this.errorDetail.should('be.visible').should('have.text','Password must have 5 ore more letters!')
    }

    verifyAlreadyExistError = () => {
        this.verifyError()
        this.errorDetail.should('be.visible').should('have.text','Username or email already in use!')
    }
}
export default new RegisterPage()