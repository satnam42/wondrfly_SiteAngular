



import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
@Injectable()
export class createCookies {
  constructor() {

  }
  createCookie(name,value,minutes) {
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime()+(minutes*60*1000));
        var expires = "; expires="+date.toUTCString();
    } else {
        var expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}
}