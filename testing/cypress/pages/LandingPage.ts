class LandingPage{
        get logo(){
                return cy.get('.flex.align-items-center')
        }

        get homeBtn(){
                return cy.get('.list-none > :nth-child(1) > .flex')
        }

        get featuresBtn(){
                return cy.get('.list-none > :nth-child(2) > .flex')
        }

        get loginBtn(){
                return cy.get('.p-button-text')
        }

        get registerBtn(){
                return cy.get('.ml-5')
        }

        get landingTitle(){
                return cy.get('.text-6xl')
        }

        get landingDesc(){
                return cy.get('.mx-4 > .font-normal')
        }

        get featuresSection(){
                return cy.get('#features')
        }

        get featuresTitle(){
                return cy.get('.text-center > .text-900')
        }

        verifyLandingPage = () => {
                // this.logo.should('be.visible').should('have.text', 'My GymBro')
                this.homeBtn.should('be.visible').should('have.text', 'Home')
                this.featuresBtn.should('be.visible').should('have.text', 'Features')
                this.loginBtn.should('be.visible').should('have.text', 'Login')
                this.registerBtn.should('be.visible').should('have.text', 'Register')
                this.landingTitle.should('be.visible').should('have.text', 'Your very ownGymBro')
                this.landingDesc.should('be.visible').should('have.text', 'Quick and easy solution for tracking your workout data and goals.')
                this.featuresSection.should('be.visible')
                this.featuresTitle.should('be.visible').should('have.text', 'Marvelous Features')
        }

        verifyLandingHomePage = () => {
                this.verifyLandingPage()
                cy.url().should('contain', '/landing#home')
        }

        verifyLandingFeaturesPage = () => {
                this.verifyLandingPage()
                cy.url().should('contain', '/landing#features')
        }
}
export default new LandingPage();

