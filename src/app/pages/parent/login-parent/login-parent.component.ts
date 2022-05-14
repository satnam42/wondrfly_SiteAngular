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
import { environment } from 'src/environments/environment';
import { MapTheme } from 'src/app/core/common/map-theme';
@Component({
  selector: 'app-login-parent',
  templateUrl: './login-parent.component.html',
  styleUrls: ['./login-parent.component.css']
})
export class LoginParentComponent implements OnInit {
  addChildForm: FormGroup;
  locationForm: FormGroup;
  keyword = '';
  addChildData: any = new Child
  categoryIds = [];
  parent = new User;
  baseUrl = environment.baseUrl
  // ---------------autucomplete-------------
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: any = [];
  message: string = 'child added Successfully';
  categories: any = [];
  filtredCats: any = []
  interests: any = [];
  kid = new Child;
  kids: any = []
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  // step5 = false
  total = 4;
  finished = 1
  title = 'Onboarding - Wondrfly';
  markerUrl = 'assets/location.svg';
  private geoCoder;
  progressBarVaue = 25;
  zoom: number = 2;
  latitude: Number;
  longitude: Number;
  @ViewChild('search', { static: false }) searchElementRef: ElementRef;
  searchTags: any = [];
  searchesCatg: any = [];
  selectedTags: any = [];
  removedTag: any;
  maxDate: string;
  searchedTags: any = []
  subCategoryCheckbox: any = []
  categoryChecked: any = []
  searchTagValue = new FormControl()
  constructor(private router: Router,
    private apiservice: ApiService,
    private ngxLoader: NgxUiLoaderService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private titleService: Title,
    private metaTagService: Meta,
    private toastr: ToastrService,
    public mapTheme: MapTheme
  ) {
    var retrievedObject = localStorage.getItem('CurrentUserWondrfly');
    this.parent = JSON.parse(retrievedObject);
  }
  logo() {
    this.router.navigate(['/search']);
  }

  // remove(indx): void {
  //   this.addChildData.interestInfo.splice(indx, 1);
  // }

  remove(t) {
    for (let i in this.searchedTags) {
      let indx = this.searchedTags[i].tags.findIndex(x => x._id === t._id)
      if (indx >= 0) {
        this.searchedTags[i].category.isSelected = false;
        this.searchedTags[i].tags[indx].isSelected = false;
      }
    }
    const index = this.kid.interestInfo.indexOf(t);

    if (index >= 0) {
      this.kid.interestInfo.splice(index, 1);
    }
  }



  selected(event: MatAutocompleteSelectedEvent): void {
    this.addChildData.interestInfo.push(event.option.value);

  }

  openSearch() {
    this.router.navigate(['/search']);
  }

  dateV() {
    let today = new Date()
    this.maxDate = moment(today).format("YYYY-MM-DD");
    document.getElementById("listingDate").setAttribute("max", this.maxDate);
  }

  validAge(addAnother?) {
    if (addAnother === 'add-another-child') {
      var birth = new Date(this.kid.dob);
      let birthYear = moment(birth).format('YYYY');
      let currentYear = moment(Date.now()).format('YYYY');
      var d1 = new Date();
      var d2 = new Date(this.kid.dob);
      if (!this.kid.name) {
        this.toastr.warning('please fill valid  name')
      }
      else if (d2.getTime() >= d1.getTime()) {
        this.toastr.warning('please fill valid DOB')
      }
      else if (birthYear >= currentYear) {
        this.toastr.warning('Please Fill Valid Birth Year!')
      }
      else {
        var ageDifMs = Date.now() - birth.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age > 16) {
          this.toastr.warning("Child age should be 16 years or less");
        } else {
          this.kid.age = String(age);
          this.kid.relationToChild = 'father'
          this.kid.sex = 'male'
           this.kid.parentId = this.parent.id
          this.kids.push(this.kid)
          console.log('kids',this.kids)
          let emptyChild = new Child 
          this.kid = emptyChild
          this.searchedTags = []
          this.keyword = ''
        }
      }
    }
    else {
      var birth = new Date(this.kid.dob);
      let birthYear = moment(birth).format('YYYY');
      let currentYear = moment(Date.now()).format('YYYY');
      var d1 = new Date();
      var d2 = new Date(this.kid.dob);
      if (!this.kid.name) {
        this.toastr.warning('please fill valid  name')
      }
      else if (d2.getTime() >= d1.getTime()) {
        this.toastr.warning('please fill valid DOB')
      }
      else if (birthYear >= currentYear) {
        this.toastr.warning('Please Fill Valid Birth Year!')
      }
      else {
        var ageDifMs = Date.now() - birth.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age > 16) {
          this.toastr.warning("Child age should be 16 years or less");
        } else {
          this.kid.age = String(age);
          this.kid.relationToChild = 'father'
          this.kid.sex = 'male'
          this.kid.parentId = this.parent.id
          this.nextStep()
        }
      }
    }

  }
  addChild() {
    // this.kid.interestInfo = this.selectedTags
      this.kids.push(this.kid)
    for(let kid of this.kids){
      this.apiservice.addChild(kid).subscribe((res: any) => {
console.log(res)
      });
    }

  }

  // ------------------------------------------auto-complete search functionality for tags-------------------
  selectEvent(item) {
    if (this.step4 === true || this.step3 === true) {
      const index: number = this.selectedTags.indexOf(item);
      if (this.selectedTags.indexOf(item) === -1 && this.interests.length <= 4) {
        this.selectedTags.push(item);
        item.active = !item.active;
      }
      else if (index !== -1) {
        item.active = !item.active;
        this.selectedTags.splice(index, 1);
      }
    }
  }

  // onChangeSearch(key: string) {
  //   this.tags = [];
  //   this.apiservice.searchTagForChildAddUpdate(key).subscribe((res: any) => {
  //     if (res.error) {
  //       this.tags = []
  //       this.searchedTags = []
  //     }
  //     else {
  //       this.tags = res;
  //        let filtredtags = this.tags.filter((item) => item.isActivated === true);
  //       let categories = []
  //       this.searchedTags = []

  //       filtredtags.forEach(tag => {
  //         categories.push(tag.categoryIds[0])
  //       });
  //       let filtredCats = this.removeDuplicates(categories, 'name')
  //       for (let j in filtredCats) {
  //         let modifiedObj:any = {
  //           category: {},
  //           tags: []
  //         }
  //         for (let i in filtredtags) {
  //           if (filtredCats[j]._id === filtredtags[i].categoryIds[0]._id) {
  //             modifiedObj.category = filtredCats[j]
  //             let indx = this.kid .interestInfo.findIndex(x => x._id===filtredtags[i]._id)
  //             if(indx>=0){
  //               filtredtags[i].isSelected = true
  //             }
  //             else{
  //               filtredtags[i].isSelected = false
  //             }
  //             modifiedObj.tags.push(filtredtags[i])
  //           }
  //         }
  //         let isTagsUncheked = modifiedObj.tags.findIndex(x => x.isSelected===false)
  //         if(isTagsUncheked===-1){
  //           modifiedObj.category.isSelected=true
  //         }
  //         this.searchedTags.push(modifiedObj)
  //       }
  //     }

  //   });
  // }

  matchCategory(id) {
    let index = this.filtredCats.findIndex(x => x._id == id)
    if (index !== -1) {
      return this.filtredCats[index].name
    }
  }
  onChangeSearch(key: string) {
    key.toLowerCase();
    this.tags = [];
    this.apiservice.searchTagForChildAddUpdate(key).subscribe((res: any) => {
      if (res.error) {
        this.tags = []
        this.searchedTags = []
      }
      else {
        this.tags = res;
        let filtredtags = this.tags.filter((item) => item.isActivated === true);
        let categories = []
        this.searchedTags = []
        filtredtags.forEach(tag => {
          categories.push(tag.categoryIds[0])
        });
        this.filtredCats = this.removeDuplicates(categories, 'name')
        for (let j in this.filtredCats) {
          let modifiedObj: any = {
            category: {},
            tags: []
          }
          for (let i in filtredtags) {
            if (this.filtredCats[j]._id === filtredtags[i].categoryIds[0]._id) {
              modifiedObj.category = this.filtredCats[j]
              let indx = this.kid.interestInfo.findIndex(x => x._id === filtredtags[i]._id)
              if (indx >= 0) {
                filtredtags[i].isSelected = true
              }
              else {
                filtredtags[i].isSelected = false
              }
              modifiedObj.tags.push(filtredtags[i])
            }
          }

          let isTagsUncheked = modifiedObj.tags.findIndex(x => x.isSelected === false)
          if (isTagsUncheked === -1) {
            modifiedObj.category.isSelected = true
          }
          this.searchedTags.push(modifiedObj)
        }
        let filtredCategories = this.categories.filter((item) => item.name !== this.matchCategory(item.id));
        filtredCategories.forEach(el => {
          let modifiedObj: any = {
            category: {},
            tags: []
          }
          let name = el.name.toLowerCase();
          let isMatched = name.includes(key)
          if (isMatched) {
            el._id = el.id
            modifiedObj.category = el

            this.searchedTags.push(modifiedObj)
          }

        });
      }
    });
  }
  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }
    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }


  // ------------------------------------------get categories-----------------------------------------------------------------
  getCategoryList() {
    this.apiservice.getCategory().subscribe((res: any) => {
      this.categories = res;
      this.categories = this.categories.filter((item) => item.isActivated === true);
    });
  }

  // ------------------------------------------get tags-----------------------------------------------------------------
  getTagList() {
    this.apiservice.getTag().subscribe((res: any) => {
      this.tags = res.data;
      this.tags = this.tags.filter((item) => item.isActivated === true);
    });
  }

  // ------------------------------------------select tags---------------------------------------------------
  selectSkills(t) {
    if (this.step4 === true || this.step3 === true) {
      const index: number = this.selectedTags.indexOf(t);
      if (this.selectedTags.indexOf(t) === -1 && this.interests.length <= 4) {
        this.selectedTags.push(t);
        t.active = !t.active;
      }
      else if (index !== -1) {
        this.selectedTags.splice(index, 1);
        t.active = !t.active;
      }
    }
  }
  // ---------------------------------------------get subCateById-------------------------------------
  getSubCateById(cat, indx) {
    this.apiservice.getTagByCategoryId(cat._id).subscribe((res: any) => {
      if (res.isSuccess) {
        this.searchedTags[indx].tags = res.data
        this.searchedTags[indx].tags = this.searchedTags[indx].tags.filter((item) => item.isActivated === true);
        this.searchedTags[indx].tags.forEach(tag => {
          if (this.kid.interestInfo.indexOf(tag) == -1) {
            if (this.kid.interestInfo.find(category => category._id === tag._id)) {
              tag.isSelected = true
            }
          }
        });
        let index = this.searchedTags[indx].tags.findIndex(x => x.isSelected !== true)
        if (index !== -1) {
          this.searchedTags[indx].category.isSelected = false;
        }
      }
    })
  }
  ngOnInit() {
    this.searchTagValue.valueChanges.subscribe((value) => {
      if (value) { this.onChangeSearch(value) } else {
        this.searchedTags = []
      }
    })
    this.dateV();
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: "Structured and well-planned onboarding process for parents to explore kids program, fun activities, and online classes. Visit Wondrfly's website for more info." }
    );
    this.metaTagService.addTag(
      { name: 'keywords', content: 'kids on boarding,onboarding' }
    );

    window.scroll(0, 0);
    this.getCategoryList();
    this.getTagList();
    this.locationForm = new FormGroup({
      location: new FormControl('', [Validators.required]),
      addressLine1: new FormControl('', [Validators.required]),
      source: new FormControl(''),

    });

    this.addChildForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      fromWhereYouHeard: new FormControl('', [Validators.required]),
    });
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      var options = {
        types: ['(cities)'],
        componentRestrictions: { country: "us" }
      };
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, options);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.locationForm.value.location = place.formatted_address;
          this.locationForm.value.addressLine1 = this.locationForm.value.location
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude
          this.zoom = 12;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.parent.lat = String(place.geometry.location.lat());
          this.parent.lng = String(place.geometry.location.lng());
        });
      });
    });
  }

  nextStep() {
    window.scroll(0, 0);
    if (this.step1) {
      this.step1 = false;
      this.step2 = true;
      this.progressBarVaue += 25;
      this.finished += 1

    }
    else if (this.step2) {
      this.step3 = true;
      this.step2 = false;
      this.progressBarVaue += 28;
      this.finished += 1
    }
    else if (this.step3) {
      this.step4 = true;
      this.step3 = false;
      this.progressBarVaue += 25;
      this.finished += 1
    }
    // else if (this.step4) {
    //   this.step5 = true;
    //   this.step4 = false;
    //   this.progressBarVaue += 25;
    // this.finished +=1
    // }
  }
  backStep() {
    window.scroll(0, 0);
    if (this.step2) {
      this.step1 = true;
      this.step2 = false;
      this.progressBarVaue -= 25;
      this.finished -= 1
    }
    else if (this.step3) {
      this.step2 = true;
      this.step3 = false;
      this.progressBarVaue -= 28;
      this.finished -= 1
    }
    else if (this.step4) {
      this.step3 = true;
      this.step4 = false;
      this.progressBarVaue -= 25;
      this.finished -= 1;
    }
    // else if (this.step5) {
    //   this.step4 = true;
    //   this.step5 = false;
    //   this.progressBarVaue -= 25;
    // this.finished -=1
    // }
  }

  // -----------------------------------------------update parent----------------------------------
  updateParent() {
    this.parent.addressLine1 = this.locationForm.value.addressLine1;
    this.parent.location = this.locationForm.value.location;
    this.parent.source = this.locationForm.value.source;
    this.ngxLoader.start();
    this.apiservice.updateParent(this.parent.id, this.parent).subscribe((res: any) => {
      this.ngxLoader.stop();
      if (res.isSuccess === true) {
        this.router.navigate(['parent/my-wondrfly'])
      }
    });
  }

  // checkOrUncheckAllTags(e, categoryIndx) {
  //   if (e.target.checked === true) {
  //     this.searchedTags[categoryIndx].category.isSelected = true;
  //     this.searchedTags[categoryIndx].tags.forEach(tag => {
  //       tag.isSelected = true
  //       if (this.kid.interestInfo.indexOf(tag) == -1) {
  //         if (!this.kid.interestInfo.find(category => category._id === tag._id)) {
  //           this.kid.interestInfo.push(tag)
  //         }
  //       }
  //     });
  //   } else {
  //     this.searchedTags[categoryIndx].category.isSelected = false;
  //     this.searchedTags[categoryIndx].tags.forEach(tag => {
  //       let index = this.kid.interestInfo.findIndex(x => x._id===tag._id)
  //       if (index!==-1) {
  //         this.kid.interestInfo.splice(index, 1)
  //       }
  //       tag.isSelected = false
  //     });
  //   }
  // }


  checkOrUncheckAllTags(e, categoryIndx) {
    if (e.target.checked === true) {
      if (!this.searchedTags[categoryIndx].tags.length) {
        this.apiservice.getTagByCategoryId(this.searchedTags[categoryIndx].category._id).subscribe((res: any) => {
          if (res.isSuccess) {
            this.searchedTags[categoryIndx].tags = res.data
            this.searchedTags[categoryIndx].category.isSelected = true;
            this.searchedTags[categoryIndx].tags.forEach(tag => {
              tag.isSelected = true
              if (this.kid.interestInfo.indexOf(tag) == -1) {
                if (!this.kid.interestInfo.find(category => category._id === tag._id)) {
                  this.kid.interestInfo.push(tag)
                }
              }
            });
          }
        })
      }
      else {
        this.searchedTags[categoryIndx].category.isSelected = true;
        this.searchedTags[categoryIndx].tags.forEach(tag => {
          tag.isSelected = true
          if (this.kid.interestInfo.indexOf(tag) == -1) {
            if (!this.kid.interestInfo.find(category => category._id === tag._id)) {
              this.kid.interestInfo.push(tag)
            }
          }
        });
      }

    } else {
      if (!this.searchedTags[categoryIndx].tags.length) {
        this.apiservice.getTagByCategoryId(this.searchedTags[categoryIndx].category._id).subscribe((res: any) => {
          if (res.isSuccess) {
            this.searchedTags[categoryIndx].tags = res.data
            this.searchedTags[categoryIndx].category.isSelected = false;
            this.searchedTags[categoryIndx].tags.forEach(tag => {
              let index = this.kid.interestInfo.findIndex(x => x._id === tag._id)
              if (index !== -1) {
                this.kid.interestInfo.splice(index, 1)
              }
              tag.isSelected = false
            });
          }
        })
      } else {
        this.searchedTags[categoryIndx].category.isSelected = false;
        this.searchedTags[categoryIndx].tags.forEach(tag => {
          let index = this.kid.interestInfo.findIndex(x => x._id === tag._id)
          if (index !== -1) {
            this.kid.interestInfo.splice(index, 1)
          }
          tag.isSelected = false
        });
      }
    }
  }
  checkOrUncheckTag(e, categoryIndx, tagIndex) {
    // const value = (element) => element === false;
    let unchecked = this.searchedTags[categoryIndx].tags.filter(tag => !tag.isSelected)
    if (e.target.checked === true) {
      if (this.kid.interestInfo.indexOf(this.searchedTags[categoryIndx].tags) == -1) {
        if (!this.kid.interestInfo.find(category => category._id === this.searchedTags[categoryIndx].tags[tagIndex]._id)) {
          this.kid.interestInfo.push(this.searchedTags[categoryIndx].tags[tagIndex])
        }
      }
      this.searchedTags[categoryIndx].tags[tagIndex].isSelected = true
      if (unchecked.length > 1) {
        this.searchedTags[categoryIndx].category.isSelected = false;
      }
      else {
        this.searchedTags[categoryIndx].category.isSelected = true;
      }
    }
    else {
      let index = this.kid.interestInfo.findIndex(x => x._id === this.searchedTags[categoryIndx].tags[tagIndex]._id)
      if (index !== -1) {
        this.kid.interestInfo.splice(index, 1)
      }
      this.searchedTags[categoryIndx].tags[tagIndex].isSelected = false
      this.searchedTags[categoryIndx].category.isSelected = false;
    }

  }


  formatSubtitle = (percent: number) => {
    return `${this.finished}/${this.total}`;
  }
}
