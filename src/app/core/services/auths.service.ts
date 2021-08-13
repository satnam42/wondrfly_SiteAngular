import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { LocalStorageService } from '.';
import { Role } from '../models/role.model';

@Injectable()
export class AuthsService {
  root = environment.apiUrls.reports;
  private _user: User;
  private _currentUserSubject = new Subject<User>()
  userChanges = this._currentUserSubject.asObservable()

  constructor(
    private http: HttpClient,
    private store: LocalStorageService
  ) {
  }

 setUser(user: User) {
    if (user) {
      this.store.setObject('userData', user);
      this.store.setItem('token', user.token);
    } else {
      this.store.clear();
    }
    this._user = user;
    this._currentUserSubject.next(user);
  }

  currentUser(): User {
    // if (this._user) {
      this._user = this.store.getObject('userData') as User;

      return this._user
    // }
// else{
//   this.store.clear();
// }

  }


  login(model): Observable<User[]> {
    const subject = new Subject<User[]>();
    this.http.post(`${this.root}/users/login`, model, { headers: null }).subscribe((responseData: any) => {
      if (responseData.statusCode !== 200) {
        throw new Error('This request has failed ' + responseData.status);
      }
      const dataModel = responseData
      if (!dataModel.isSuccess) {
        if (responseData.status === 200) {
          // this.toasty.error(dataModel.error);
          throw new Error(dataModel.code || dataModel.message || 'failed');
        } else {
          throw new Error(responseData.status + '');
        }
      }
      this.setUser(dataModel.data)
      subject.next(dataModel);
    },
      (error) => {
        subject.next(error.error);
      });
    return subject.asObservable();
  }
  isAuthorized() {
      return !!this._user;
  }

  hasRole(role: Role) {
      return this.isAuthorized() && this._user.role === role;
  }
  logout() {
    localStorage.clear();
    this.setUser(null)
  }
}
