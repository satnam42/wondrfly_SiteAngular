import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '.';
import { Observable, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class TypeFormService {
    root = `https://api.typeform.com`;
    workspace_id="jN2ZDN";
    token = 'DKTCwqrvp8GFCPJBp3XudYfo3de7U6NUDpBUXm2KjgQv';
    constructor(private http: HttpClient, private store: LocalStorageService,
    ) {
    }
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
      }
    }


getForms(): Observable<any[]> {
  const subject = new Subject<any[]>();
  this.http.get(`${this.root}/forms?page=1&page_size=4&workspace_id=${this.workspace_id}`, this.getHeader()).subscribe((responseData:any) => {
    console.log('responseData',responseData)
      subject.next(responseData);
  }, (error) => {
      subject.next(error.error);
  });
  return subject.asObservable();
}
}
