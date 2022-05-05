import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  logout() {
    localStorage.removeItem('currentUserWondrflyToken');
    localStorage.removeItem('CurrentUserWondrfly');
    localStorage.removeItem('program');
  }
  constructor() { }

}
