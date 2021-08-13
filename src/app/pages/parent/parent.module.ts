//module
import { NgModule } from '@angular/core';
import { ParentRoutingModule } from './parent.routing';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CustomFormsModule } from 'ng2-validation';
// import { AgmCoreModule } from '@agm/core';

// components
import { LoginParentComponent } from './login-parent/login-parent.component'
import { ParentProfileComponent } from './parent-profile/parent-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AgmCoreModule } from '@agm/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxMaskModule } from 'ngx-mask';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
    entryComponents: [],
    declarations: [
        LoginParentComponent, ParentProfileComponent

    ],
    imports: [
        CommonModule,
        FormsModule,
        CustomFormsModule,
        ReactiveFormsModule,
        CoreModule,
        MatSliderModule,
        MatChipsModule,
        MatAutocompleteModule,
        NgxUiLoaderModule,
        MatIconModule,
        MatTooltipModule,
        MatStepperModule,
        ParentRoutingModule,
        AutocompleteLibModule,
        InfiniteScrollModule,
        MatProgressBarModule,
        NgxMaskModule.forRoot(),
        // GoogleMapsModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyD_5P0pxn1q9hvvTeCr3YCsDhLJoHwxs2c',
          libraries: ['places']
        }),
    ],
    exports: [
        LoginParentComponent, ParentProfileComponent
    ]
})
export class ParentModule { }
