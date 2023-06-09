import RegisterPage from "./RegisterPage"

class LoginPage{
       get rememberMeBtn(){
              return cy.get('.p-checkbox-box')
       }

       verifyLoginText(){
              RegisterPage.textSection.within(()=>{
                     cy.get('.mb-5').should('be.visible')
                     cy.get('.text-900').should('have.text', 'Welcome!')
                     cy.get('.text-600').should('have.text', 'Sign in to continue')
        })
       }
       verifyLogin(){
              RegisterPage.registerSection.should('be.visible').within(()=>{
                     this.verifyLoginText()
                     RegisterPage.emailInput.should('be.visible')
                     RegisterPage.passwordInput.should('be.visible')
                     RegisterPage.piEye.should('be.visible')
                     this.rememberMeBtn.should('be.visible')
                     RegisterPage.signUpBtn.should('be.visible').should('have.text','Sign In')
              })
       }

       login(email: string, password: string){
              RegisterPage.emailInput.click().type(email)
              RegisterPage.passwordInput.click().type(password)
              RegisterPage.signUpBtn.click()
              cy.url().should('not.contain','/login')
       }
}
export default new LoginPage();