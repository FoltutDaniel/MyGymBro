class RegisterPage{
    get registerSection(){
        return cy.get('.surface-card')
    }

    get textSection(){
        return cy.get('.text-center')
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

    get piEyeNormal(){
        return cy.get('.pi-eye')
    }

    get piEyeSlash(){
        return cy.get('.pi-eye-slash')
    }

    verifyRegisterText(){
        this.textSection.within(()=>{
            cy.get('.mb-5').should('be.visible')
            cy.get('.text-900').should('have.text', 'Welcome!')
            cy.get('.text-600').should('have.text', 'Sign up to continue')
        })
    }

    verifyRegister(){
        this.registerSection.should('be.visible').within(()=>{
            this.verifyRegisterText()
            this.usernameInput.should('be.visible')
            this.emailInput.should('be.visible')
            this.passwordInput.should('be.visible')
            this.piEye.should('be.visible')
            this.signUpBtn.should('be.visible').should('have.text','Sign Up')
        })
    }

    signUp(username: string, email: string, password: string){
        this.usernameInput.click().type(username)
        this.emailInput.click().type(email)
        this.passwordInput.click().type(password)
        this.passwordVerification.should('be.visible') //add verification panel
        this.piEyeNormal.click()
        this.piEyeSlash.should('be.visible')
        this.signUpBtn.click()
        cy.url().should('contain','/login')

    }
}
export default new RegisterPage()