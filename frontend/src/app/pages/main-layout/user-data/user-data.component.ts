import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";

@Component({
    templateUrl: './user-data.component.html'
})
export class UserDataComponent implements OnInit{

    userData;
    weight = 0;
    height = 0;
    targetWeight = 0;
    bmi = 0;
    constructor(private userDataService: UserService) {
    }

    ngOnInit(): void {
        this.userDataService.getUserData(Number(sessionStorage.getItem('id'))).subscribe(data =>{
            this.userData = data;
            this.calculateBmi();
        })
    }

    updateUserData(){
        this.userDataService.updateUserData({id: this.userData.id,user: {id: sessionStorage.getItem('id')}, weight: this.userData.weight, height: this.userData.height, targetWeight: this.userData.targetWeight}).subscribe(data => {
            console.log(data);
        })
    }

    calculateBmi(){
        this.bmi = this.userData.weight / (this.userData.height * this.userData.height);
    }


}
