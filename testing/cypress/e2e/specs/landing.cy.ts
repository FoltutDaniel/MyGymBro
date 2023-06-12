import LandingPage from "../../pages/LandingPage";

describe('Home Page test scenarios', () => {

    beforeEach(()=>{
        cy.visit('/landing')
    })

    it('Verify landing page elements', () => {
        LandingPage.verifyLandingPage()
    });

    it('Verify home elements on landing page', () => {
        LandingPage.homeBtn.click()
        LandingPage.verifyLandingHomePage()
    });

    it('Verify features elements on landing page', () => {
        LandingPage.featuresBtn.click()
        LandingPage.verifyLandingFeaturesPage()
    });

    it('Verify home-features navigation and elements on landing page', () => {
        LandingPage.homeBtn.click()
        LandingPage.verifyLandingHomePage()
        LandingPage.featuresBtn.click()
        LandingPage.verifyLandingFeaturesPage()
    });
});