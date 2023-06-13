import { interceptConstants } from "../../helpers/interceptConstants";
import { getMockRequest } from "../../helpers/interceptHelpers";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import LandingPage from "../../pages/LandingPage";

describe('Home Page test scenarios', () => {

    beforeEach(()=>{
        cy.visit('/')
        LandingPage.loginBtn.click()
        LoginPage.login('test@test12.com','test123')
    })

    it('Verify layout page', () => {
        HomePage.verifyDefaultPage()
    });

    it('Verify home page', () => {
        HomePage.verifyHome()
    });
});