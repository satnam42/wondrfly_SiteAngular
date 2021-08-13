import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { AuthsService } from '../../services/auths.service';
import { ApiService } from '../../services/api.service.service';
import { Alert } from '../../models/alert.model';
declare const $: any;
@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']

})
export class AlertComponent implements OnInit {
    currentUser = new User;
    alertColor = "";
    alert: any = new Alert;
    isAlert = false;
    constructor(private auth: AuthsService,
        private apiservice: ApiService) {
        this.currentUser = this.auth.currentUser();
        if (this.currentUser) {
            this.isAlert = true
            // this.getUserById()
        }
    }
    getUserById() {
        this.apiservice.getUserById(this.currentUser.id).subscribe((res: any) => {
            this.currentUser = res.data;
            return this.showAlert();
        })
    }
    deactivateAlert() {
        this.alert.alertId = this.alert._id;
        this.alert.userId = this.currentUser.id;
        this.apiservice.deactivateAlert(this.alert).subscribe((res: any) => {
            this.currentUser = res.data;
        })
    }
    showAlert() {
        this.apiservice.showAlert().subscribe((res: any) => {
            this.alert = res;
            if (this.alert) {
                if (this.currentUser.disableAlert === this.alert._id) {
                    this.isAlert = false;
                }
                else if (this.alert.msgType == 'notice') { this.alertColor = 'alert-warning' }
                else if (this.alert.msgType == 'warning') { this.alertColor = 'alert-danger' }
                else if (this.alert.msgType == 'information') { this.alertColor = 'alert-success' }
            }
        })
    }
    ngOnInit() {
        window.scroll(0, 0);
    }

}
