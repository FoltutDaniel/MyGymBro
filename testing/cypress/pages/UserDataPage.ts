class UserDataPage{
        get title(){
                return cy.get('h4')
        }

        get weightLabel(){
                return cy.get(':nth-child(1) > [style="width: 5rem; display: inline-block;"]')
        }

        get weightInput(){
                return cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        }

        get heightLabel(){
                return cy.get(':nth-child(2) > [style="width: 5rem; display: inline-block;"]')
        }

        get heightInput(){
                return cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        }

        get targetWeightLabel(){
                return cy.get(':nth-child(3) > [style="width: 5rem; display: inline-block;"]')
        }

        get targetWeightInput(){
                return cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        }

        get currentBmiLabel(){
                return cy.get(':nth-child(4) > [style="width: 5rem; display: inline-block;"]')
        }

        get currentBmiInput(){
                return cy.get(':nth-child(4) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        }

        get saveDataBtn(){
                return cy.get('p-button.p-element > .p-ripple')
        }

        verifyUserData = () => {
                cy.url().should('contain','/user-data')
                this.title.should('be.visible').should('have.text', 'User Data Page')
                this.weightLabel.should('be.visible').should('have.text', 'Weight:')
                this.weightInput.should('be.visible')
                this.heightLabel.should('be.visible').should('have.text', 'Height:')
                this.heightInput.should('be.visible')
                this.targetWeightLabel.should('be.visible').should('have.text', 'Target Weight:')
                this.targetWeightInput.should('be.visible')
                this.currentBmiLabel.should('be.visible').should('have.text', 'Current BMI:')
                this.currentBmiInput.should('be.visible')
                this.saveDataBtn.should('be.visible').should('have.text', 'Save your data')
        }

        addUserData = (weight: string, height: string, targetWeight: string, currentBMI: string) => {
                this.weightInput.type(weight)
                this.heightInput.type(height)
                this.targetWeightInput.type(targetWeight)
                this.currentBmiInput.type(currentBMI)
                this.saveDataBtn.click()
        }

}
export default new UserDataPage();

