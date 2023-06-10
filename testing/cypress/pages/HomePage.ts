class FirstPage{
        get logo(){
                return cy.get('.layout-topbar-logo')
        }

        get menuBtn(){
                return cy.get('.layout-menu-button')
        }

        get menuList(){
                return cy.get('.layout-sidebar')
        }

        get profileBtn(){
                return cy.get('.layout-topbar-button')
        }

        get profilePanel(){
                return cy.get('.p-overlaypanel-content')
        }

        get homeBtn(){
                return cy.get('.ng-tns-c5-28')
        }

        get workoutsBtn(){
                return cy.get('.ng-tns-c5-29')
        }

        get exercisesBtn(){
                return cy.get('.ng-tns-c5-30')
        }

        get userDataBtn(){
                return cy.get('.ng-tns-c5-31')
        }

        get accountDataBtn(){
                return cy.get('[routerlink="/account-data"] > .p-ripple')
        }

        get signOutBtn(){
                return cy.get('[routerlink="/landing"] > .p-ripple > .p-button-label')
        }

        verifyDefaultPage(){
                this.logo.should('be.visible').should('have.text', 'My GymBro')
                this.menuBtn.should('be.visible')
                this.profileBtn.should('be.visible')
                this.menuBtn.click()
                this.menuList.should('be.visible')
                this.homeBtn.should('be.visible').should('have.text', 'Home')
                this.workoutsBtn.should('be.visible').should('have.text', 'Workouts')
                this.exercisesBtn.should('be.visible').should('have.text', 'Exercises')
                this.userDataBtn.should('be.visible').should('have.text', 'User Data')
                this.profileBtn.click()
                this.profilePanel.should('be.visible')
                cy.get('p').should('have.text', 'Hello User!')
                this.accountDataBtn.should('be.visible').should('have.text', 'Account Data')
                this.signOutBtn.should('be.visible').should('have.text', 'Sign Out')
        }

}
export default new FirstPage();
        
        cy.get('.layout-topbar-logo')
 

