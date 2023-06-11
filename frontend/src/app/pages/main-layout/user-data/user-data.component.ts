import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";

@Component({
    templateUrl: './user-data.component.html'
})
export class UserDataComponent implements OnInit{

    userData;
    weight;
    height;
    targetWeight;
    constructor(private userDataService: UserService) {
    }

    ngOnInit(): void {
        this.userDataService.getUserData(Number(sessionStorage.getItem('id'))).subscribe(data =>{
            console.log(data);
            this.userData = data;
        })
    }

    updateUserData(){
        this.userDataService.updateUserData({id: sessionStorage.getItem('id'), weight: this.weight, height: this.height, targetWeight: this.targetWeight}).subscribe(data => {
            console.log(data);
        })
    }


}
