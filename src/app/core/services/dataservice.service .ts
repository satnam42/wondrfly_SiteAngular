import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any={};
  private location: any;
  
  setOption(option) {
    this.data = option;
  }
  getOption() {
    return this.data;
  }
  setLocation(option) {
    this.location = option;
  }
  getLocation() {
    return this.location;
  }


  constructor() { }
}