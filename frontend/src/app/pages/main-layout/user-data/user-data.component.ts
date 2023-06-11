import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {MessageService} from "primeng/api";

@Component({
    templateUrl: './user-data.component.html',
    providers: [MessageService]
})
export class UserDataComponent implements OnInit{

    userData;
    weight = 0;
    height = 0;
    targetWeight = 0;
    bmi = 0;
    constructor(private userDataService: UserService, private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.userDataService.getUserData(Number(sessionStorage.getItem('id'))).subscribe(data =>{
            this.userData = data;
            this.calculateBmi();
        })
    }

    updateUserData(){
        this.userDataService.updateUserData({id: this.userData.id,user: {id: sessionStorage.getItem('id')}, weight: this.userData.weight, height: this.userData.height, targetWeight: this.userData.targetWeight}).then(data => {
          this.messageService.add({severity: 'success', summary: "Success", detail:"User data was saved"});
        }).catch(() =>{
            this.messageService.add({severity: 'error', summary: "Error", detail:"There was a problem with user data saving!"});
        });
    }

    calculateBmi(){
        this.bmi = this.userData.weight / (this.userData.height * this.userData.height);
    }


}
