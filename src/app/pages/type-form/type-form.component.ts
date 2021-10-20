import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Child, User } from 'src/app/core/models';
import * as moment from 'moment';
import { MapsAPILoader } from '@agm/core';
import { Meta, Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent implements OnInit {
  typeForm : FormGroup
  constructor(private router: Router,

  ) {
    var retrievedObject = localStorage.getItem('userData');
  }
  logo() {
    this.router.navigate(['/search']);
  }


  ngOnInit() {


    window.scroll(0, 0);
    this.typeForm = new FormGroup({
      location: new FormControl('', [Validators.required]),
      addressLine1: new FormControl('', [Validators.required]),

    });
  }

  nextStep() {
    window.scroll(0, 0);
}
backStep() {
  window.scroll(0, 0);
}

  }
