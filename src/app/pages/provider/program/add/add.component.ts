import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBar, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { ApiService } from 'src/app/core/services/api.service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { Program, User, Category } from '../../../../core/models';
import { Observable } from 'rxjs';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import * as moment from 'moment';
import { Batch } from 'src/app/core/models/batch.model';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit,AfterViewChecked {
  fileData: File = null;
  addProgramForm: FormGroup;
  isOneTimeEvent = false;
  isMultiEvent = false;
  isDatesTBS = false;
  isFree = false;
  adultAssistanceIsRequried = false;
  selectedPlan: string;
  program = new Program;
  fromDate = new Date;
  toDate = new Date;
  fromTime = new Date;
  toTime = new Date;
  response: any
  userData = new User;
  getTagResponse: any;
  categories: any = new Category
  private geoCoder;
  keyword = 'name';
  searchesCatg: any = [];
  dragDropConfig = {
    showList: true,
    showProgress: false
  }
  session: any = {
    sessionName: '',
    sessionAddress: '',
    sessionStartTime: '',
    sessionEndTime: '',
    sessionStartDate: '',
    sessionEndDate: '',
    noOfSeats: '',




  };
  //  ng5slider start age group

  minAge: number = 6;
  maxAge: number = 12;

  ageOption: Options = {
    step:0.5,
    floor: 0,
    ceil: 20,
    translate: (value: number): string => {
      return value + ' YRS';
    }

  };
  // ng5slider end

  //  ng5slider start capacity

  minCapacity: number = 0;
  maxCapacity: number = 25;

  capacityOption: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number): string => {
      return value + '';
    }

  };
  // ng5slider end
  email: string;
  bookingCancelledIn = {
    days: "",
    hours: ""
  };



  time = {
    from: Date(),
    to: Date(),
  };
  date = {
    from: Date(),
    to: Date()
  };
  batch = new Batch;
  isLoading: Boolean = false
  message: string = 'Updated Successfully';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  progressBarVaue = 15;
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  step5 = false;
  step6 = false;
  step7 = false;
  step8 = false;
  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  constructor(private fb: FormBuilder, private dialog: MatDialog,
    private apiservice: ApiService,
    private snack: MatSnackBar,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private ngxLoader: NgxUiLoaderService) {
    var retrievedObject = localStorage.getItem('userData');
    this.userData = JSON.parse(retrievedObject);

    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
  }
  onChange(data) {
    this.program.duration = moment.utc(moment(this.toTime, "HH:mm:ss").diff(moment(this.fromTime, "HH:mm:ss"))).format("mm");
  }
  selectCategory(t: any) {
    console.log(t)
    if (t._id) {
      t.id = t._id;
    }
    t.active = !t.active;
    if (!t.active) { this.program.categoryId = '' }
    else {
      this.program.categoryId = t.id;
    }
    // const index: number = this.interests.indexOf(t.id);
    // if (this.interests.indexOf(t.id) === -1) {
    //   this.interests.push(t.id);
    // }ng s

    // else if (index !== -1) {
    //   this.interests.splice(index, 1);
    // }
    console.log('intrests', this.program.categoryId)
  }
  publishProgram() {
    this.program.capacity.min = this.minCapacity
    this.program.capacity.max = this.maxCapacity
    this.program.ageGroup.from = this.minAge
    this.program.ageGroup.to = this.maxAge
    this.program.userId = this.userData.id;
    this.program.bookingCancelledIn = this.bookingCancelledIn;
    // this.program.time.from = new Date(this.fromTime);
    // this.program.time.to = new Date(this.toTime);
    // this.program.date.from = moment(this.fromDate).format('YYYY-MM-DD')
    // this.program.date.to = moment(this.toDate).format("YYYY-MM-DD")
    this.program.isFree = this.isFree;
    this.program.adultAssistanceIsRequried = this.adultAssistanceIsRequried;
    this.program.sessions.push(this.session);
    console.log('program info before add', this.program);
    this.ngxLoader.start();
    this.apiservice.addProgram(this.program).subscribe((res: any) => {
      console.log('program info after add', res);
      this.ngxLoader.stop();
      if (res.isSuccess) {
        this.snack.open('Program Added successfully', 'OK', { duration: 5000 });
        this.router.navigate(["/program/list"]);
      } else {
        this.snack.open(res.error, 'OK', { duration: 5000 });
      }
    });
    this.ngxLoader.stop();
  }
  getCategoryList() {
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res;
    });
  }


  ngOnInit() {
    window.scroll(0, 0);
    this.getCategoryList()

  }
  ngAfterViewChecked() {
    // console.log('minAge>>',this.minAge)
    // console.log('maxAge>>',this.maxAge)
    // console.log('stepOption>>',this.ageOption.step)


    // if(this.minAge>=3 && this.maxAge>=3){
    //   this.ageOption.step = 1;
    // }
    // if(this.minAge<3 && this.maxAge>=3){
    //   this.ageOption.step = 0.5;
    // }
    // if(this.minAge<3 && this.maxAge<3){
    //   this.ageOption.step = 0.5;
    // }
    // if(this.minAge<3 && this.maxAge<3){
    //   this.ageOption.step = 0.5;
    // }
  }
  selectSingleEvent() {
    this.isOneTimeEvent = true;
    this.isMultiEvent = false;
    this.isDatesTBS = false;
    this.program.type = 'one time event'
  }
  selectScheduled() {
    this.isOneTimeEvent = false;
    this.isMultiEvent = true;
    this.isDatesTBS = false;
    this.program.type = 'multi event'
  }

  selectUnScheduled() {
    this.isOneTimeEvent = false;
    this.isMultiEvent = false;
    this.isDatesTBS = true;
    this.program.type = 'datesTBS'
  }

  UploadImage(e) {
    var formData = new FormData();
    this.fileData = e.target.files[0];
    formData.append('image', this.fileData);
    this.apiservice.getPicUrl(formData).subscribe((res: any) => {
      this.program.programImage = res;
      console.log(this.program.programImage)
    })
  }
  nextStep() {
    window.scroll(0, 0);
    if (this.step1) {
      this.step1 = false;
      this.step2 = true;
      this.progressBarVaue += 10;
    }
    else if (this.step2) {
      this.step2 = false;
      this.step3 = true;
      this.progressBarVaue += 16;

    }
    else if (this.step3) {
      this.step3 = false;
      this.step4 = true;
      this.progressBarVaue += 16;
    }
    else if (this.step4) {
      this.step4 = false;
      this.step5 = true;
      this.progressBarVaue += 16;
    }
    else if (this.step5) {
      this.step5 = false;
      this.step6 = true;
      this.progressBarVaue += 100;
    }



  }
  backStep() {
    window.scroll(0, 0);
    if (this.step2) {
      this.step1 = true;
      this.step2 = false;
      this.progressBarVaue -= 10;
    }
    else if (this.step3) {
      this.step2 = true;
      this.step3 = false;
      this.progressBarVaue -= 16;
    }
    else if (this.step4) {
      this.step3 = true;
      this.step4 = false;
      this.progressBarVaue -= 16;
    }
    else if (this.step5) {
      this.step4 = true;
      this.step5 = false;
      this.progressBarVaue -= 16;
    }
    else if (this.step6) {
      this.step5 = true;
      this.step6 = false;
      this.progressBarVaue -= 100;
    }

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.interests.push(event.option.value);
  }

  selectEvent(item) {
    this.program.categoryId = item._id;
  }



  onChangeSearch(key: string) {
    this.ngxLoader.start();
    this.apiservice.searchCategory(key).subscribe((res: any) => {
      this.searchesCatg = res.data;
      this.ngxLoader.stop()
    });
  }

}
