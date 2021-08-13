import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any;
  setOption(option) {
    console.log('setOption', option);
    this.data = option;
  }
  getOption() {
    return this.data;
  }
  constructor() { }
}