import { set } from "cypress/types/lodash"

class ExercisesPage{
        get exerciseCard(){
                return cy.get('.card > div.ng-star-inserted')
        }

        get exerciseTitle(){
                return cy.get('h2')
        }

        get exerciseCategory(){
                return cy.get('h5')
        }

        get exerciseImage(){
                return cy.get('img')
        }

        get addToWorkoutBtn(){
                return cy.get('p-button.p-element > .p-ripple')
        }

        get addExerciseTitle(){
                return cy.get('#pr_id_3-label')
        }

        get addExerciseModal(){
                return cy.get('.p-dialog-content')
        }

        get workoutDate(){
                return cy.get('.p-dropdown')
        }

        get exerciseWeightLabel(){
                return cy.get(':nth-child(2) > [style="width: 5rem; display: inline-block;"]')
        }

        get exerciseWeightInput(){
                return cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        }

        get exerciseRepsLabel(){
                return cy.get(':nth-child(3) > [style="width: 5rem; display: inline-block;"]')
        }

        get exerciseRepsInput(){
                return cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        }

        get exerciseSetsLabel(){
                return cy.get(':nth-child(4) > [style="width: 5rem; display: inline-block;"]')
        }

        get exerciseSetsInput(){
                return cy.get(':nth-child(4) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        }

        get addExerciseBtn(){
                return cy.get('.ng-tns-c16-9 > p-button.p-element > .p-ripple')
        }

        get selectWorkoutDate(){
                return cy.get('.p-dropdown-items > :nth-child(1)')
        }

        verifyExercisePage = (apiResp: any) => {
                this.exerciseCard.should('be.visible').then(()=>{
                        for(let apiIdx = 0; apiIdx < apiResp.length - 1; apiIdx+=1){
                                cy.get(`.card > :nth-child(${apiIdx+1})`).within(($el)=>{
                                       this.exerciseImage.should('be.visible')
                                        this.exerciseTitle.should('be.visible').should('have.text',`${apiResp[apiIdx].name}`)
                                        this.exerciseCategory.should('be.visible').should('have.text',`Category: ${apiResp[apiIdx].category}`)
                                        this.addToWorkoutBtn.should('be.visible').should('have.text','Add to workout') 
                                })
                        }
                })
                
        }

        verifyAddExerciseModal = ()=> {
               this.addExerciseTitle.should('be.visible').should('have.text','Add exercise')
               this.addExerciseModal.should('be.visible')
               cy.get('.p-dropdown').should('be.visible')
               this.exerciseWeightLabel.should('be.visible').should('have.text','Weight: ')
               this.exerciseWeightInput.should('be.visible')
               this.exerciseRepsLabel.should('be.visible').should('have.text','Reps: ')
               this.exerciseRepsInput.should('be.visible')
               this.exerciseSetsLabel.should('be.visible').should('have.text','Sets: ')
               this.exerciseSetsInput.should('be.visible')
               this.addExerciseBtn.should('be.visible')
        }

        addExercise = (weight: string, reps: string, sets: string) => {
                this.workoutDate.click()
                this.selectWorkoutDate.click()
                this.exerciseWeightInput.type(weight)
                this.exerciseRepsInput.type(reps)
                this.exerciseSetsInput.type(sets)
                this.addExerciseBtn.click()
        }
}
export default new ExercisesPage();

