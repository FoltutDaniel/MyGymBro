import { interceptConstants } from "../../helpers/interceptConstants";
import { getMockRequest } from "../../helpers/interceptHelpers";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import WorkoutsPage from "../../pages/WorkoutsPage";
import workoutsResp from '../../fixtures/workoutsResp.json';

describe('Workouts page verification', () => {
    const url = Cypress.env('URL');

    beforeEach(()=>{
        cy.visit(`${url}/#/auth/login`)
        LoginPage.login('test@test12.com','test123')
    })

    it('Verify the workout page', () => {
        getMockRequest(
            interceptConstants.getWorkouts.method,
            interceptConstants.httpsSuccess,
            interceptConstants.getWorkouts.path,
            workoutsResp,
            'getWorkouts')
        HomePage.workoutsBtn.click()
        cy.url().should('contain', '/workouts')
        cy.wait('@getWorkouts')
        WorkoutsPage.verifyWorkoutPage(workoutsResp)
    });

    it('Add a 2h workout', () => {
        HomePage.workoutsBtn.click()
        cy.url().should('contain', '/workouts')
        WorkoutsPage.createWorkout.click()
        WorkoutsPage.verifyCreateWorkoutModal()
        WorkoutsPage.addWorkout('2')
        WorkoutsPage.verifySuccessMessage()
        WorkoutsPage.noExerciseWorkout(2)
    });
});