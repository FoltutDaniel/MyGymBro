import RegisterPage from "./RegisterPage"

class LoginPage{
       get errorSection(){
              return cy.get('.p-toast-message-content')
       }

       get errorSummary(){
              return cy.get('.p-toast-summary')
       }

       get errorDetail(){
              return cy.get('.p-toast-detail')
       }

       verifyLoginText = () => {
              cy.get('.text-center > .mb-5').should('be.visible')
              cy.get('.text-center > .text-900').should('have.text', 'Welcome!')
              cy.get('.text-600').should('have.text', 'Sign in to continue')
       }

       verifyLogin = () => {
              cy.url().should('contain', '/auth/login')
              RegisterPage.registerSection.should('be.visible').within(()=>{
                     this.verifyLoginText()
                     RegisterPage.emailInput.should('be.visible')
                     RegisterPage.passwordInput.should('be.visible')
                     RegisterPage.piEye.should('be.visible')
                     RegisterPage.signUpBtn.should('be.visible').should('have.text','Sign In')
              })
       }

       login = (email: string, password: string) => {
              cy.url().should('contain', '/auth/login')
              RegisterPage.emailInput.click().type(email)
              RegisterPage.passwordInput.click().type(password)
              RegisterPage.signUpBtn.click()
              cy.wait(200)
       }

       verifyErrorMessage = () => {
              this.errorSection.should('be.visible')
              this.errorSummary.should('be.visible').should('have.text','Error')
              this.errorDetail.should('be.visible').should('have.text','Invalid email / password combination!')
       }
}
export default new LoginPage();