import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // private data = {};
  logout() {
    localStorage.removeItem('currentUserWondrflyToken');
    localStorage.removeItem('CurrentUserWondrfly');
    localStorage.removeItem('program');
    // this.data = null;
  }

  constructor() { }

}
