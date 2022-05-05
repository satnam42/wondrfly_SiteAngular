import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loader-file',
  templateUrl: './loader-file.component.html',
  styleUrls: ['./loader-file.component.css']
})
export class LoaderFileComponent implements OnInit {

  optionslotti: AnimationOptions = {
    path: '/assets/wLoader.json',
  };
  constructor() { }
  ngOnInit(): void {
  }

}
