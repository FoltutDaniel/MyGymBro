import LoginPage from "./LoginPage"

class AccountDataPage{
        get title(){
                return cy.get('h4')
        }

        get newPassword(){
                return cy.get(':nth-child(1) > .ng-untouched')
        }

        get confirmPassword(){
                return cy.get(':nth-child(2) > .ng-untouched')
        }

        get changePass(){
                return cy.get('p-button.p-element > .p-ripple')
        }

        verifyUserData = () => {
                cy.url().should('contain','/account-data')
        }

        changePassword = (newPass: string, confirmPass: string) => {
                this.newPassword.click().type(newPass)
                this.confirmPassword.click().type(confirmPass)
                this.changePass.click()
        }

        verifyErrorMessage = () => {
              LoginPage.errorSection.should('be.visible')
              LoginPage.errorSummary.should('be.visible').should('have.text','Error')
              LoginPage.errorDetail.should('be.visible').should('have.text','Passwords do not match!')
       }

}
export default new AccountDataPage();

