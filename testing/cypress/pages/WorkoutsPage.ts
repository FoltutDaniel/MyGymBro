class WorkoutsPage{
        get workoutContent(){
                return cy.get('.card')
        }

        get createWorkout(){
                return cy.get('.workout-btn')
        }
        get workoutModalTitle(){
                return cy.get('.p-dialog-header')
        }

        get workoutModalContent(){
                return cy.get('.p-dialog-content')
        }

        get closeWorkoutModal(){
                return cy.get('.p-dialog-header-close-icon')
        }

        get createWorkoutBtnModal(){
                return cy.get('.ng-tns-c16-9 > p-button.p-element > .p-ripple')
        }

        get successSection(){
                return cy.get('.p-toast-message-content')
        }

        get successSummary(){
                return cy.get('.p-toast-summary')
        }

        get successDetail(){
                return cy.get('.p-toast-detail')
        }

        numberOfWorkouts = () => {
                return this.workoutContent.find('.ng-star-inserted').its('length')
        }

        numberOfExercises = (idx: number) => {
                let totalLength
                cy.get(`.card > :nth-child(${idx+3})`).find('div.ng-star-inserted').then(($value) => {
                        totalLength = $value.length
                })
                return totalLength
        }


        getRow = (idx:number) =>{

        }

        verifyWorkoutPage = (apiResp: any) => {
                let valuesArray = apiResp
                this.workoutContent.should('be.visible')
                this.createWorkout.should('be.visible').should('have.text', 'Create workout')
                        for(let apiDataIdx = 0; apiDataIdx < valuesArray.length; apiDataIdx+=1){
                                cy.get(`.card > :nth-child(${apiDataIdx+3})`).within((el)=>{
                                        cy.get('h2').should('contain.text', `Workout ${valuesArray[apiDataIdx].id}`)
                                        cy.get('h4').should('contain.text', `Date`)
                                        cy.get('h5').should('contain.text', `Workout duration: ${valuesArray[apiDataIdx].workoutDuration}`)
                                        cy.get('h4').should('contain.text', `Workout exercises`)
                                        cy.get('div.ng-star-inserted').first().within(($el)=>{
                                                cy.get(`:nth-child(1)`).should('contain.text',`Exercise: ${valuesArray[apiDataIdx].exerciseWorkoutRels[0].exercise.name}`)
                                                cy.get(`:nth-child(2)`).should('contain.text',`Weight: ${valuesArray[apiDataIdx].exerciseWorkoutRels[0].weight}`)
                                                cy.get(`:nth-child(3)`).should('contain.text',`Number of reps: ${valuesArray[apiDataIdx].exerciseWorkoutRels[0].numberOfReps}`)
                                                cy.get(`:nth-child(4)`).should('contain.text',`Number of sets: ${valuesArray[apiDataIdx].exerciseWorkoutRels[0].numberOfSets}`) 
                                        })
                                })
                        }
        }

        verifyLastWorkout = (duration: number, exercise: string, weight: number, numberOfReps: number, numberOfSets: number ) => {
                this.workoutContent.should('be.visible')
                this.createWorkout.should('be.visible').should('have.text', 'Create workout')
                                cy.get(`.card > :nth-child(3)`).within((el)=>{
                                        cy.get('h2').should('contain.text', `Workout 1`)
                                        cy.get('h4').should('contain.text', `Date`)
                                        cy.get('h5').should('contain.text', `Workout duration: ${duration}`)
                                        cy.get('h4').should('contain.text', `Workout exercises`)
                                        cy.get('div.ng-star-inserted').first().within(($el)=>{
                                                cy.get(`:nth-child(1)`).should('contain.text',`Exercise: ${exercise}`)
                                                cy.get(`:nth-child(2)`).should('contain.text',`Weight: ${weight}`)
                                                cy.get(`:nth-child(3)`).should('contain.text',`Number of reps: ${numberOfReps}`)
                                                cy.get(`:nth-child(4)`).should('contain.text',`Number of sets: ${numberOfSets}`) 
                                        })
                                })
        }

        verifyCreateWorkoutModal = ()=> {
                this.workoutModalTitle.should('have.text','Workout')
                this.workoutModalContent.within(()=>{
                        cy.get('.dialog-element').should('be.visible').should('contain.text','Workout Duration:')
                        this.createWorkoutBtnModal.should('be.visible').should('have.text','Create workout')
                })
        }
        addWorkout = (hours: string) => {
                this.createWorkout.click()
                this.workoutModalContent.within(()=>{
                        cy.get('.dialog-element').type(hours)
                        this.createWorkoutBtnModal.click()
                })
        }

        verifySuccessMessage = () => {
              this.successSection.should('be.visible')
              this.successSummary.should('be.visible').should('have.text','Success')
              this.successDetail.should('be.visible').should('have.text','Workout creation was successful!')
       }

       noExerciseWorkout = (duration: number) => {
                this.workoutContent.should('be.visible')
                this.createWorkout.should('be.visible').should('have.text', 'Create workout')
                                cy.get(`.card > :nth-child(3)`).within((el)=>{
                                        cy.get('h2').should('contain.text', `Workout 1`)
                                        cy.get('h4').should('contain.text', `Date`)
                                        cy.get('h5').should('contain.text', `Workout duration: ${duration}`)
                                        cy.get('h4').should('contain.text', `This workout has no exercises added`)
                                })
        }
}
export default new WorkoutsPage();

