import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // private data = {};
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('CurrentUserWondrfly');
    localStorage.removeItem('program');
    // this.data = null;
  }

  constructor() { }

}
