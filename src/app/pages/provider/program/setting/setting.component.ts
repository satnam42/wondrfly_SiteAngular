import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CustomValidators } from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { AuthsService } from 'src/app/core/services/auths.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { User } from '../../../../core/models';

import { Claim } from 'src/app/core/models/claim.model';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})

export class SettingComponent implements OnInit {
  @ViewChild(HeaderComponent, { static: true }) headerComponent: HeaderComponent;
  user = new User;
  message: string = 'Updated Successfully';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  resetPasswordForm: FormGroup;
  phoneVerificationForm: FormGroup;
  otpForm: FormGroup;
  isVerification = false;
  isSecurity = true;
  isNotification = false
  answer: string = '';
  showOtpform: boolean = false;
  showPhoneform: boolean = true;
  isNumber: boolean = true;
  hideModal: boolean = false;
  isClaimStatus = false;
  verification = '';
  security = 'active';
  claimStatus = '';
  notificationStatus = '';
  userData: any = {};
  isAgree: Boolean = false;
  isAnswerVerify: Boolean = false;
  isOldQuestion: Boolean = false;
  resetPasswordResponse: any = {};
  resetPasswordData: any = {
    oldPassword: '',
    newPassword: '',
  }

  phoneVerification: any = {
    phoneNumber: '',
  }

  otpVerification: any = {
    otp: '',
  }

  claimRequestList: any = new Claim;
  value: any;
  isToggle: boolean;
  constructor(
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    private auth: AuthsService,
    private apiservice: ApiService,
    private toastr: ToastrService,

  ) {
    // this.user = this.auth.currentUser();
    // if (this.user.securityQuestion != "" && this.user.securityQuestion != undefined && this.user.securityQuestion != null) {
    //   this.isOldQuestion = true
    // }
    // this.auth.userChanges.subscribe(user => this.user = user)
    var retrievedObject = localStorage.getItem('userData');
    this.userData = JSON.parse(retrievedObject);
    console.log('userdata', this.userData)

  }


  ngOnInit() {
    window.scroll(0, 0);
    this.ClaimRquestListByProvider();
    this.getUser(this.userData.id);
    let newPassword = new FormControl('', [Validators.required]);
    let confirmPassword = new FormControl('', [Validators.required,
    CustomValidators.equalTo(newPassword)]);
    this.resetPasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: newPassword,
      confirmPassword: confirmPassword
    });

    this.otpForm = new FormGroup({
      otp: new FormControl('', [Validators.required])
    });


    this.phoneVerificationForm = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required]),
    });

  }




  openPopUp(value): void {
    // const dialogRef = this.dialog.open(ModalComponent, {
    //   width: '500px',
    //   data: { name: value }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   // this.animal = result;
    // });

  }
  submit() {
    if (!this.isOldQuestion) {
      if (!this.isAgree) {
        let msg = 'please mark check box first';
        this.toastr.info(msg);
        alert(msg)
        return
      }
      this.user.answer = this.answer
      this.ngxLoader.start();
      this.apiservice.updateProviderById(this.userData.id, this.user).subscribe((res: any) => {
        this.ngxLoader.stop();
        this.getUser(this.userData.id)

        // $('#SequrityModal').hide();
        // this.router.navigate(['/program/setting']);
      });
    }
    else {
      this.verifyAns()
    }


  }
  verifyAns() {

    let verifyAnsBody: any = {
      answer: this.answer

    }
    if (!this.isAgree) {
      let msg = 'please mark check box first';
      this.toastr.info(msg);
      alert(msg)
      return
    }
    this.ngxLoader.start();
    this.apiservice.verifyAns(this.userData.id, verifyAnsBody).subscribe((res: any) => {
      if (res) {
        this.isOldQuestion = false;
      }
      else {
        alert('Wrong Answer')
        this.isOldQuestion = false;
      }
      this.ngxLoader.stop();
    });
  }

  onSecurity() {
    window.scroll(0, 0);
    this.isSecurity = true;
    this.isVerification = false;
    this.isClaimStatus = false;
    this.isNotification = false;
    this.security = 'active';
    this.verification = '';
    this.notificationStatus = '';
    this.claimStatus = '';

  }
  onVerification() {
    window.scroll(0, 0);
    this.isSecurity = false;
    this.isVerification = true;
    this.isClaimStatus = false;
    this.isNotification = false;

    this.verification = 'active';
    this.security = '';
    this.notificationStatus = '';
    this.claimStatus = '';
  }
  onClaimStatus() {
    window.scroll(0, 0);
    this.isSecurity = false;
    this.isVerification = false;
    this.isClaimStatus = true;
    this.isNotification = false

    this.verification = '';
    this.security = '';
    this.notificationStatus = '';
    this.claimStatus = 'active';
  }
  onNotification() {
    window.scroll(0, 0);
    this.isSecurity = false;
    this.isVerification = false;
    this.isClaimStatus = false;
    this.isNotification = true

    this.verification = '';
    this.security = '';
    this.claimStatus = '';
    this.notificationStatus = 'active';
  }




  getUser(id) {
    this.apiservice.getUserById(id).subscribe((res: any) => {
      this.user = res.data;
      console.log('res userssss', this.user);
      if (this.user.securityQuestion != "" && this.user.securityQuestion != undefined && this.user.securityQuestion != null) {
        this.isOldQuestion = true
      }
      if (this.user.notificationsOnOff === true) {
        this.isToggle = true;
      }
      this.router.navigate(['/program/setting']);
    });
  }

  sendOtp() {
    this.ngxLoader.start();
    this.apiservice.sendOtp(this.phoneVerification).subscribe((res: any) => {
      this.ngxLoader.stop();
      console.log('resss', res)
      this.value = res.data.otpToken
      if (res.isSuccess === true) {
        this.showOtpform = true;
        this.isNumber = false
        this.showPhoneform = false;
        this.toastr.info('Success',res.data.message)
      } else
        this.toastr.info('Error',res.error)
    })
  }

  verifyNumber() {
    let data: any = {
      userId: "",
      phoneNumber: '',
      otp: '',
      otpToken: '',
    }

    data.userId = this.userData.id
    data.phoneNumber = this.phoneVerification.phoneNumber
    data.otp = this.otpVerification.otp
    data.otpToken = this.value

    console.log('dattta', data)
    this.ngxLoader.start();
    this.apiservice.phoneVerify(data).subscribe((res: any) => {
      this.ngxLoader.stop();
      console.log('resss', res)
      if (res.isSuccess === true) {
        this.toastr.info('Success',res.message.message)
        this.getUser(this.userData.id);
        window.document.getElementById("close_model").click();
        window.document.getElementById("close_model1").click();
        this.ngxLoader.stop();
      } else {
        this.toastr.info(res.error)
        this.ngxLoader.stop();
      }
    })
  }

  resetForm() {
    this.otpForm.reset();
    this.phoneVerificationForm.reset();
  }

  deleteNumber() {
    this.ngxLoader.start();
    this.apiservice.deletePhoneNumber(this.userData.id).subscribe((res: any) => {
      this.ngxLoader.stop();
      if (res.isSuccess) {
        this.getUser(this.userData.id);
      }
    });
  }

  resetPassword(id) {
    this.ngxLoader.start();
    this.apiservice.resetPassword(id, this.resetPasswordData).subscribe((res: any) => {
      this.ngxLoader.stop();
      console.log('resss', res)
      if (res.isSuccess) {
        this.auth.logout();
        this.router.navigate(["/login"]);
        this.toastr.info( 'success',res.message)
      } else {
        this.toastr.info(res.error)

      }
    });
  }
  ClaimRquestListByProvider() {
    this.ngxLoader.start();
    this.apiservice.ClaimRquestListByProvider(this.userData.id).subscribe(res => {
      this.claimRequestList = res;
      console.log('claimRequestList', this.claimRequestList);
      this.ngxLoader.stop();
    });
    this.ngxLoader.stop();
  }
  onOffNotification(id, e) {
    console.log('status before', e)
    this.apiservice.onOffNotification(id, e).subscribe((res: any) => {
      console.log('notific onoff res', res)
    });
  }
}
