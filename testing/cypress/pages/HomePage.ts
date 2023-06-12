class HomePage{
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
                return cy.get('.layout-topbar-menu > .p-link')
        }

        get profilePanel(){
                return cy.get('.p-overlaypanel-content')
        }

        get homeBtn(){
                return cy.get('.ng-tns-c5-4.ng-tns-c5-3 > .p-ripple')
        }

        get workoutsBtn(){
                return cy.get('.ng-tns-c5-5.ng-tns-c5-3 > .p-ripple')
        }

        get exercisesBtn1(){
                return cy.get('.ng-tns-c5-6.ng-tns-c5-3 > .p-ripple')
        }
        get exercisesBtn2(){
                return cy.get('.ng-tns-c5-5.ng-tns-c5-2 > .p-ripple')
        }

        get userDataBtn(){
                return cy.get('.ng-tns-c5-7.ng-tns-c5-3 > .p-ripple')
        }

        get accountDataBtn(){
                return cy.get('[routerlink="/account-data"] > .p-ripple')
        }

        get signOutBtn(){
                return cy.get('[routerlink="/landing"] > .p-ripple')
        }

        get workoutGraph(){
                return cy.get('canvas')
        }

        get homeTitle(){
                return cy.get('h4')
        }

        verifyDefaultPage(){
                this.logo.should('be.visible').should('have.text', 'My GymBro')
                this.menuBtn.should('be.visible')
                this.profileBtn.should('be.visible')
                this.menuList.should('be.visible')
                this.homeBtn.should('be.visible').should('have.text', 'Home')
                this.workoutsBtn.should('be.visible').should('have.text', 'Workouts')
                this.exercisesBtn1.should('be.visible').should('have.text', 'Exercises')
                this.userDataBtn.should('be.visible').should('have.text', 'User Data')
                this.profileBtn.click()
                this.profilePanel.should('be.visible')
                cy.get('p').should('contain', 'Hello')
                this.accountDataBtn.should('be.visible').should('have.text', 'Account Data')
                this.signOutBtn.should('be.visible').should('have.text', 'Sign out')
        }

        verifyHome(){                
                this.homeBtn.click()
                cy.get('.card').should('be.visible')
                this.homeTitle.should('have.text','Home Page')
                this.workoutGraph.should('be.visible')
        }


}
export default new HomePage();

