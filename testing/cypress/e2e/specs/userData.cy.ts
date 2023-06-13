import { interceptConstants } from "../../helpers/interceptConstants";
import { getMockRequest } from "../../helpers/interceptHelpers";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import LandingPage from "../../pages/LandingPage";
import UserDataPage from "../../pages/UserDataPage";

describe('User Data Page test scenarios', () => {

    beforeEach(()=>{
        cy.visit('/')
        LandingPage.loginBtn.click()
        LoginPage.login('test@test12.com','test123')
    })

    it('Verify user data page', () => {
        HomePage.userDataBtn.click()
        cy.url().should('contain','/user-data')
        UserDataPage.verifyUserData()
    });

    it('Add user data', () => {
        HomePage.userDataBtn.click()
        cy.url().should('contain','/user-data')
        UserDataPage.addUserData('60','1.66','55')
        UserDataPage.verifySuccessMessage()
    });
});