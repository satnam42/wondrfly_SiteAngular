import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models';
import { Child } from '../models/child.model';
import { Category } from '../models/category.model';
import { Program } from '../models/program.model';
import { Tag } from '../models/tag.model';
import { LocalStorageService } from '.';
import { Claim } from '../models/claim.model';
import { environment } from 'src/environments/environment';
import { Forum } from '../models/forum.model';
import { Alert } from '../models/alert.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SocialUser } from '../models/social.model';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    root = environment.apiUrls.reports;
    userResponse: any;
    token = ''
    header = {}
    constructor(private http: HttpClient, private store: LocalStorageService,
        private ngxLoader: NgxUiLoaderService,
        private toastr: ToastrService,) {
    }

    //-------------------- get header -------------------------------->

    getHeader() {
        this.token = this.store.getItem('token')
        if (this.token) {
            let header = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'x-access-token': this.token,
                })
            };
            return header
        } else {
            let header = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            }
            return header
        }
    }

    //------------------------ otp request --------------------------->

    otpRequest(email): Observable<User> {
        const subject = new Subject<User>();
        this.http.get(`${this.root}/users/otp?email=${email}`).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);

        });
        return subject.asObservable();
    }

    //----------------------------- otp verify ----------------------------->

    otpVerify(model): Observable<User> {
        const subject = new Subject<User>();
        this.http.post(`${this.root}/users/otpVerify`, model, { headers: null }).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            // this.toasty.error(dataModel.error);
            subject.next(dataModel.error);

        });
        return subject.asObservable();
    }

    //------------------------------- forgot password ---------------------->

    forgotPassword(model): Observable<User> {
        const subject = new Subject<User>();
        this.http.post(`${this.root}/users/forgotPassword`, model, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            // this.toasty.error(dataModel.error);
            subject.next(dataModel.error);

        });
        return subject.asObservable();
    }

    //--------------------------- reset password --------------------------->

    resetPassword(id, model): Observable<User> {
        const subject = new Subject<User>();
        this.http.put(`${this.root}/users/resetPassword/${id}`, model, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }


    //------------------------ otp request verify phone number --------------------------->

    sendOtp(model): Observable<User> {
        const subject = new Subject<User>();
        this.http.post(`${this.root}/twilio/sendOtpSMS`, model, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);

        });
        return subject.asObservable();
    }

    phoneVerify(model): Observable<User> {
        const subject = new Subject<User>();
        this.http.post(`${this.root}/twilio/otpVerify`, model, { headers: null }).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            // this.toasty.error(dataModel.error);
            subject.next(dataModel.error);

        });
        return subject.asObservable();
    }



    deletePhoneNumber(id): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.post(`${this.root}/providers/deletePhoneNumber?id=${id}`, "", this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }



    //---------------------------- upload user Image ------------------------>

    uploadUserImage(id, model): Observable<any> {
        const subject = new Subject<any>();
        this.http.put(`${this.root}/users/uploadProfilePic/${id}`, model, {
            headers: new HttpHeaders({
                'enctype': 'multipart/form-data',
                'Accept': 'application/json',
                'x-access-token': this.token
            })
        }).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    //----------------------------- get pic url ------------------------------->

    getPicUrl(pic) {
        const subject = new Subject<any>();
        this.http.post(`${this.root}/uploads/getPicUrl`, pic, {
            headers: new HttpHeaders({
                'enctype': 'multipart/form-data',
                'Accept': 'application/json',
                'x-access-token': this.token
            })
        }).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();

    }

    //------------------------------- upload provider banner ----------------------->

    uploadProviderBanner(id, model): Observable<any> {
        const subject = new Subject<any>();
        this.http.put(`${this.root}/providers/uploadBannerPic/${id}`, model, {
            headers: new HttpHeaders({
                'enctype': 'multipart/form-data',
                'Accept': 'application/json',
                'x-access-token': this.token
            })
        }).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);

        });
        return subject.asObservable();

    }

    //----------------------------- upload child Image ----------------------->

    uploadChildImage(model): Observable<any> {
        const subject = new Subject<any>();
        this.http.post(`${this.root}/child/uploadChildPic`, model, {
            headers: new HttpHeaders({
                'enctype': 'multipart/form-data',
                'Accept': 'application/json',
                'x-access-token': this.token
            })
        }).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);

        });
        return subject.asObservable();

    }

    //------------------------- add user --------------------------------->

    addUser(data): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.post(`${this.root}/users/register`, data, { headers: null }).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    // -------------------get users-----------------------

    getUsers(role, no, size): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.get(`${this.root}/users/list?pageNo=${no}&pageSize=${size}&role=${role}`, { headers: null }).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    searchUsers(name, role): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.get(`${this.root}/users/search?name=${name}&role=${role}`, this.getHeader()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
      //------------------------- contactUs --------------------------------->

      contactUs(data): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.post(`${this.root}/users/contactUs`, data, { headers: null }).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
    //---------------------------- get parent by Id -------------------------->

    getParentById(id): Observable<User> {
        const subject = new Subject<User>();
        this.http.get(`${this.root}/parents/getById/${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);

        });
        return subject.asObservable();
    }

    //------------------------------- update parent -------------------------->

    updateParent(id, data): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.put(`${this.root}/parents/update/${id}`, data, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);

        });
        return subject.asObservable();
    }

    //----------------------------- tell friend ------------------------->

    tellFriend(model): Observable<User> {
        const subject = new Subject<User>();
        this.http.post(`${this.root}/users/tellAFriend`, model).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    //---------------------------- active/deactive user ------------------------>

    activeDeactiveUser(id, isActivated): Observable<User> {
        const subject = new Subject<User>();
        this.http.put(`${this.root}/users/activeOrDeactive?id=${id}&isActivated=${isActivated}`, '', this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);

        });
        return subject.asObservable();
    }

    // ----------------------------- give feedback --------------------------->

    giveFeedback(model): Observable<User> {
        const subject = new Subject<User>();
        this.http.post(`${this.root}/users/feedback`, model).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);

        });
        return subject.asObservable();
    }

    // ----------------------------- claim Request -------------------------->

    claimRequest(model): Observable<Claim> {
        const subject = new Subject<Claim>();
        this.http.post(`${this.root}/claims/request`, model, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);

        });
        return subject.asObservable();
    }

    //---------------------------- Claim Rquest List By Provider ---------------->

    ClaimRquestListByProvider(id): Observable<Claim[]> {
        const subject = new Subject<Claim[]>();
        this.http.get(`${this.root}/claims/requestListByProvider?id=${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);

        });
        return subject.asObservable();
    }

    // -------------------------- get child by parent Id ------------------------>

    getChildByParentId(id): Observable<Child[]> {
        const subject = new Subject<Child[]>();
        this.http.get(`${this.root}/child/byParentId/${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            // this.toasty.error(dataModel.error);
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- get child by guardian Id ------------------------>

    getChildByGuardianId(id): Observable<Child[]> {
        const subject = new Subject<Child[]>();
        this.http.get(`${this.root}/child/byGuardianId/${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            // this.toasty.error(dataModel.error);
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // ----------------------------- add child ------------------------------->

    addChild(model): Observable<Child[]> {
        const subject = new Subject<Child[]>();
        this.http.post(`${this.root}/child/add`, model, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);

        });
        return subject.asObservable();
    }

    // ----------------------------- delete child ------------------------------->

    deleteChild(id): Observable<Child[]> {
        const subject = new Subject<Child[]>();
        this.http.put(`${this.root}/child/delete/${id}`, '', this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // ----------------------------- invite guardian ------------------------------->

    inviteGuardian(model): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.post(`${this.root}/guardians/sendOtp`, model, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }
    // ----------------------------- add/signup guardian ------------------------------->

    signupGuardian(model): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.post(`${this.root}/guardians/add`, model, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // ----------------------------- delete guardian ------------------------------->

    deleteGuardian(id): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.delete(`${this.root}/guardians/remove/${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }
 // ----------------------------- delete guardian ------------------------------->

 activeDactiveChild(id,value): Observable<Child[]> {
    const subject = new Subject<Child[]>();
    let model:any;
    this.http.put(`${this.root}/child/activeOrDeactive?id=${id}&isActivated=${value}`,model, this.getHeader()).subscribe((responseData: any) => {
        if (responseData.statusCode !== 200) {
            throw new Error('This request has failed ' + responseData.status);
        }
        const dataModel = responseData;
        if (!dataModel.isSuccess) {
            if (responseData.status === 200) {
                // this.toasty.error(dataModel.error);
                throw new Error(dataModel.code || dataModel.message || 'failed');
            } else {
                throw new Error(responseData.status + '');
            }
        }
        subject.next(responseData);
    }, (error) => {
        const dataModel = error;
        subject.next(dataModel.error);
    });
    return subject.asObservable();
}

    // ----------------------------- activedeactive guardian ------------------------------->

    activedeactiveGuardian(id,value): Observable<User[]> {
        const subject = new Subject<User[]>();
        let model:any;
        this.http.put(`${this.root}/guardians/activeOrDeactive?id=${id}&isActivated=${value}`,model, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // ----------------------------- update guardian ------------------------------->

    updateGuardian(model): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.put(`${this.root}/guardians/update/${model.id}`, model, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // ----------------------------- update child ------------------------------->

    updateChild(id, model): Observable<Child[]> {
        const subject = new Subject<Child[]>();
        this.http.put(`${this.root}/child/update/${id}`, model, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }
    // ----------------------------- update Provider By Id -------------------------->
    updateProviderById(id, model): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.http.put(`${this.root}/providers/update/${id}`, model, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // ----------------------------- get category -------------------------->

    getCategory(): Observable<Category> {
        const subject = new Subject<Category>();
        this.http.get(`${this.root}/categories/list`).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            // this.toasty.error(dataModel.error);
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // ----------------------------- search category -------------------------->

    searchCategory(key): Observable<Category> {
        const subject = new Subject<Category>();
        this.http.get(`${this.root}/categories/search?name=${key}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // ----------------------------- program search -------------------------->

    programSearch(key): Observable<Category> {
        const subject = new Subject<Category>();
        this.http.get(`${this.root}/programs/search?name=${key}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }
      // ----------------------------- program get by lat long or (location) -------------------------->

      programByLatLng(lat,lng): Observable<Category> {
        const subject = new Subject<Category>();
        this.http.get(`${this.root}/programs/nearBy?lat=${lat}&lng=${lng}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }
    // ----------------------------- program filter -------------------------->

    programFilter(filter, pageNo, pageSize): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/multiFilter?${filter}&pageNo=${pageNo}&pageSize=${pageSize}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(dataModel);
        }, (error) => {
            const dataModel = error;
            // this.toasty.error(dataModel.error);
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }


    activityByNameDate(activityName) {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/searchByNameAndDate?programName=${activityName}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }


    // ----------------------------- search tag ------------------------------>

    searchTag(key): Observable<Tag> {
        const subject = new Subject<Tag>();
        this.http.get(`${this.root}/tags/search?name=${key}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // ----------------------------- get tag -------------------------->

    getTag(): Observable<any> {
        const subject = new Subject<any>();
        this.http.get(`${this.root}/tags/list`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- get Tag By Category Id ------------------------->

    getTagByCategoryId(id): Observable<User> {
        const subject = new Subject<User>();
        this.http.get(`${this.root}/tags/byCategoryId?catrgoryIds=${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // --------------------------get Favourite ByParent Id------------------------->

    getFavouriteByParentId(id): Observable<any> {
        const subject = new Subject<any>();
        this.http.get(`${this.root}/favourites/getByParentId?parentId=${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // --------------------------get guardian ByParent Id------------------------->

    getGuardianByParentId(id): Observable<User> {
        const subject = new Subject<User>();
        this.http.get(`${this.root}/guardians/byParentId/${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- get user by Id ------------------------->

    getUserById(id): Observable<User> {
        const subject = new Subject<User>();
        this.http.get(`${this.root}/users/getById/${id}`,).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }
    // ---------------------------delete notification by id---------------------

    deleteNotification(model): Observable<User> {
        const subject = new Subject<User>();
        this.http.delete(`${this.root}/notification/deleteNotification?id=${model._id}&userId=${model.user}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }
 // ---------------------------on/off notification by id---------------------

onOffNotification(id,e): Observable<User> {
    console.log('before id',id);
    const subject = new Subject<User>();
    this.http.put(`${this.root}/notification/onOff?id=${id}&status=${e}`,'', this.getHeader()).subscribe((responseData: any) => {
        if (responseData.statusCode !== 200) {
            throw new Error('This request has failed ' + responseData.status);
        }
        const dataModel = responseData;
        if (!dataModel.isSuccess) {
            if (responseData.status === 200) {
                throw new Error(dataModel.code || dataModel.message || 'failed');
            } else {
                throw new Error(responseData.status + '');
            }
        }
        subject.next(responseData);
    }, (error) => {
        const dataModel = error;
        subject.next(dataModel.error);
    });
    return subject.asObservable();
}
    // -------------------------- get provider by Id ------------------------->

    getProviderById(id): Observable<User> {
        const subject = new Subject<User>();
        this.http.get(`${this.root}/providers/getById/${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- get Profile Progress ------------------------->

    getProfileProgress(id, role): Observable<User> {
        const subject = new Subject<User>();
        this.http.get(`${this.root}/users/getProfileProgress?id=${id}&role=${role}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }
    getPublishedProgram(pageNo, pageSize, programType): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/listPublishOrUnpublish?pageNo=${pageNo}&pageSize=${pageSize}&programType=${programType}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }
    programPublishUnpublish(id, isPublished) {
        const subject = new Subject<Program[]>();
        this.http.put(`${this.root}/programs/publish?programId=${id}&isPublished=${isPublished}`, '', this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }
    // -------------------------- get Program by provider ------------------------->

    getProgramByProvider(userId, pageNo, pageSize): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/byProvider?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    //-------------------------- get open programs ------------------------>

    getOpenPrograms(pageNo, pageSize): Observable<Program> {
        const subject = new Subject<Program>();
        // this.ngxLoader.start();
        // tslint:disable-next-line:max-line-length
        this.http.get(`${this.root}/programs/openPrograms?pageNo=${pageNo}&pageSize=${pageSize}`, this.getHeader()).subscribe((responseData: any) => {
            // this.ngxLoader.stop();
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.items);
        }, (error) => {
            const dataModel = error;
            // this.toasty.error(dataModel.error);
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- get Program by id ------------------------->

    getProgramById(id): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/getById/${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- add Fav Program ------------------------->

    addFavProgram(model): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.post(`${this.root}/favourites/add`, model, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- delete Fav Program ------------------------->

    deleteFavProgram(id): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.delete(`${this.root}/favourites/delete/${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- add Program ------------------------->

    addProgram(model): Observable<Program[]> {
        const subject = new Subject<Program[]>();
        this.http.post(`${this.root}/programs/add`, model, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- program Active InActive ------------------------->

    programActiveInActive(id, status) {
        const subject = new Subject<Program[]>();
        this.http.put(`${this.root}/programs/activeOrDecactive?id=${id}&status=${status}`, '', this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------------- get view ------------------------------>

    getView(id): Observable<any> {
        const subject = new Subject<any>();
        this.http.get(`${this.root}/programs/getViewsCount?userId=${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- graph data ------------------------->

    graphData(id): Observable<any> {
        const subject = new Subject<any>();
        this.http.get(`${this.root}/programs/getGraphData?id=${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- get program count ------------------------->

    getProgramCount(id): Observable<any> {
        const subject = new Subject<any>();
        this.http.get(`${this.root}/programs/count?userId=${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- update program ------------------------->

    updateProgram(id, model): Observable<Program[]> {
        const subject = new Subject<Program[]>();
        this.http.put(`${this.root}/programs/update/${id}`, model, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- verify Ans ------------------------->

    verifyAns(id, model): Observable<User> {
        const subject = new Subject<User>();
        this.http.put(`${this.root}/users/verifySecuirtyAns/${id}`, model, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- search program ------------------------->

    searchProgram(key): Observable<Program> {
        const subject = new Subject<Program>();
        this.http.get(`${this.root}/programs/search?name=${key}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- add action ------------------------->

    addAction(data): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.post(`${this.root}/programs/addProgramAction`, data, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // --------------------------get form list ------------------------->

    forumList(pageNo, pageSize): Observable<Forum[]> {
        const subject = new Subject<Forum[]>();
        this.http.get(`${this.root}/posts/list?pageNo=${pageNo}&pageSize=${pageSize}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // --------------------------get form list by Role ------------------------->

    forumListByRole(role): Observable<Forum[]> {
        const subject = new Subject<Forum[]>();
        this.ngxLoader.start();
        this.http.get(`${this.root}/posts/postsByRole?role=${role}`, this.getHeader()).subscribe((responseData: any) => {
            this.ngxLoader.stop();
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            this.ngxLoader.stop();
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- form list by Id ------------------------->

    forumById(id): Observable<Forum[]> {
        const subject = new Subject<Forum[]>();
        this.http.get(`${this.root}/posts/byId/${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // ----------------------------- form Search ---------------------------->

    forumSearch(key, role): Observable<Forum> {
        const subject = new Subject<Forum>();
        this.http.get(`${this.root}/posts/search?name=${key}&role=${role}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- add comment ------------------------->

    addComment(data): Observable<Forum[]> {
        const subject = new Subject<Forum[]>();
        this.http.post(`${this.root}/comments/create`, data, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- form like ------------------------->

    forumLike(like): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.post(`${this.root}/likes/like`, like, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- show alert ------------------------->

    showAlert(): Observable<Alert> {
        const subject = new Subject<Alert>();
        this.http.get(`${this.root}/alert/showAlert`,).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            // this.toasty.error(dataModel.error);
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    // -------------------------- deactivate alert ------------------------->

    deactivateAlert(data): Observable<Alert> {
        const subject = new Subject<Alert>();
        this.http.put(`${this.root}/alert/deactivateAlert`, data, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            // this.toasty.error(dataModel.error);
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    //------------------------ get badge list --------------------------->

    badgeList(): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.get(`${this.root}/badges/list`, this.getHeader()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    getOldChat(roomId, pageNo, pageSize): Observable<any[]> {
        const subject = new Subject<any[]>();
        this.http.get(`${this.root}/conversations/getOldChat?room_id=${roomId}&pageNo=${pageNo}&pageSize=${pageSize}`, this.getHeader()).subscribe((responseData) => {
            this.userResponse = responseData;
            subject.next(this.userResponse.items);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }
 //-------------------------------- Signup with Facebook --------------------------------->

 signupWithFb(model): Observable<SocialUser[]> {
    const subject = new Subject<SocialUser[]>();
    this.http.post(`${this.root}/users/facebook/login`, model).subscribe((responseData: any) => {
        if (responseData.statusCode !== 200) {
            throw new Error('This request has failed ' + responseData.status);
        }
        const dataModel = responseData;
        if (!dataModel.isSuccess) {
            if (responseData.status === 200) {
                throw new Error(dataModel.code || dataModel.message || 'failed');
            } else {
                throw new Error(responseData.status + '');
            }
        }
        subject.next(responseData);
    }, (error) => {
        const dataModel = error;
        subject.next(dataModel.error);
    });
    return subject.asObservable();
}



//-------------------------------- Signup with Google --------------------------------->

signupWithGoogle(model): Observable<SocialUser[]> {
    const subject = new Subject<SocialUser[]>();
    this.http.post(`${this.root}/users/loginWithGoogle`, model).subscribe((responseData: any) => {
        if (responseData.statusCode !== 200) {
            throw new Error('This request has failed ' + responseData.status);
        }
        const dataModel = responseData;
        if (!dataModel.isSuccess) {
            if (responseData.status === 200) {
                throw new Error(dataModel.code || dataModel.message || 'failed');
            } else {
                throw new Error(responseData.status + '');
            }
        }
        subject.next(responseData);
    }, (error) => {
        const dataModel = error;
        subject.next(dataModel.error);
    });
    return subject.asObservable();
}

//--------------------------------------clear all notification --------------------------------------------------------------->
clearAllNotifications(id): Observable<User> {
    const subject = new Subject<User>();
    this.http.delete(`${this.root}/notification/deleteAll?id=${id}`, this.getHeader()).subscribe((responseData: any) => {
        if (responseData.statusCode !== 200) {
            throw new Error('This request has failed ' + responseData.status);
        }
        const dataModel = responseData;
        if (!dataModel.isSuccess) {
            if (responseData.status === 200) {
                // this.toasty.error(dataModel.error);
                throw new Error(dataModel.code || dataModel.message || 'failed');
            } else {
                throw new Error(responseData.status + '');
            }
        }
        subject.next(responseData.data);
    }, (error) => {
        const dataModel = error;
        subject.next(dataModel.error);
    });
    return subject.asObservable();
}

sendFeedback(model): Observable<any[]> {
    const subject = new Subject<any[]>();
    this.http.post(`${this.root}/feedback/create`, model).subscribe((responseData: any) => {
        if (responseData.statusCode !== 200) {
            throw new Error('This request has failed ' + responseData.status);
        }
        const dataModel = responseData;
        if (!dataModel.isSuccess) {
            if (responseData.status === 200) {
                throw new Error(dataModel.code || dataModel.message || 'failed');
            } else {
                throw new Error(responseData.status + '');
            }
        }
        subject.next(responseData);
    }, (error) => {
        const dataModel = error;
        subject.next(dataModel.error);
    });
    return subject.asObservable();
}

//-------------------------------------- Get users rating by id --------------------------------------------------------------->
getUserRating(id): Observable<any> {
    const subject = new Subject<any>();
    this.http.get(`${this.root}/providers/getRatingByUser/${id}`, this.getHeader()).subscribe((responseData: any) => {
        if (responseData.statusCode !== 200) {
            throw new Error('This request has failed ' + responseData.status);
        }
        const dataModel = responseData;
        if (!dataModel.isSuccess) {
            if (responseData.status === 200) {
                // this.toasty.error(dataModel.error);
                throw new Error(dataModel.code || dataModel.message || 'failed');
            } else {
                throw new Error(responseData.status + '');
            }
        }
        subject.next(responseData.data);
    }, (error) => {
        const dataModel = error;
        subject.next(dataModel.error);
    });
    return subject.asObservable();
}


//-------------------------------------- top rated programs --------------------------------------------------------------->
getTopRated(): Observable<any> {
    const subject = new Subject<any>();
    this.http.get(`${this.root}/programs/topRating`).subscribe((responseData: any) => {
        if (responseData.statusCode !== 200) {
            throw new Error('This request has failed ' + responseData.status);
        }
        const dataModel = responseData;
        if (!dataModel.isSuccess) {
            if (responseData.status === 200) {
                // this.toasty.error(dataModel.error);
                throw new Error(dataModel.code || dataModel.message || 'failed');
            } else {
                throw new Error(responseData.status + '');
            }
        }
        subject.next(responseData.data);
    }, (error) => {
        const dataModel = error;
        subject.next(dataModel.error);
    });
    return subject.asObservable();
}

// ------------------------------------------subCategory fillter--------------------------------------------

programBySubCategoryIds(filter, pageNo, pageSize): Observable<Program> {
    const subject = new Subject<Program>();
    this.ngxLoader.start();
    this.http.get(`${this.root}/programs/subCategoryFilter?${filter}&pageNo=${pageNo}&pageSize=${pageSize}`, this.getHeader()).subscribe((responseData: any) => {
        this.ngxLoader.stop();
        if (responseData.statusCode !== 200) {
            throw new Error('This request has failed ' + responseData.status);
        }
        const dataModel = responseData;
        if (!dataModel.isSuccess) {
            if (responseData.status === 200) {
                throw new Error(dataModel.code || dataModel.message || 'failed');
            } else {
                throw new Error(responseData.status + '');
            }
        }
        subject.next(responseData);
    }, (error) => {
        this.ngxLoader.stop();
        const dataModel = error;
        // this.toasty.error(dataModel.error);
        subject.next(dataModel.error);
    });
    return subject.asObservable();
}

//-------------------------------------- Get users rating by id --------------------------------------------------------------->
getSuggestedCategory(id): Observable<any> {
    const subject = new Subject<any>();
    this.http.get(`${this.root}/suggestion/bySubcategoryId/${id}`, this.getHeader()).subscribe((responseData: any) => {
        if (responseData.statusCode !== 200) {
            throw new Error('This request has failed ' + responseData.status);
        }
        const dataModel = responseData;
        if (!dataModel.isSuccess) {
            if (responseData.status === 200) {
                // this.toasty.error(dataModel.error);
                throw new Error(dataModel.code || dataModel.message || 'failed');
            } else {
                throw new Error(responseData.status + '');
            }
        }
        subject.next(responseData.data);
    }, (error) => {
        const dataModel = error;
        subject.next(dataModel.error);
    });
    return subject.asObservable();
}


}
