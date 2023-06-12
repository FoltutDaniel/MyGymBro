import { interceptConstants } from "../../helpers/interceptConstants";
import { getMockRequest } from "../../helpers/interceptHelpers";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import exercisesResp from '../../fixtures/exercisesResp.json';
import ExercisesPage from "../../pages/ExercisesPage";
import WorkoutsPage from "../../pages/WorkoutsPage";


describe('Exercises page verification', () => {
    const url = Cypress.env('URL');

    beforeEach(()=>{
        cy.visit(`${url}#/auth/login`)
        LoginPage.login('test@test12.com','test123')
        getMockRequest(
            interceptConstants.getExercises.method,
            interceptConstants.httpsSuccess,
            interceptConstants.getExercises.path,
            exercisesResp,
            'getExercises')
        HomePage.exercisesBtn1.click()
        cy.url().should('contain', '/exercises')
        cy.wait('@getExercises')
    })

    it('Verify the exercise page', () => {
        ExercisesPage.verifyExercisePage(exercisesResp)
    });

    it('Verify add exercise to workout modal', () => {
        ExercisesPage.addToWorkoutBtn.eq(0).click()
        ExercisesPage.verifyAddExerciseModal()
    });

    it('Add a exercise to workout', () => {
        ExercisesPage.addToWorkoutBtn.eq(0).click()
        cy.wait(8000)
        ExercisesPage.addExercise('15','12','4')
        HomePage.workoutsBtn.click()
        WorkoutsPage.verifyLastWorkout(2,`Test`,15,12,4)

    });
});