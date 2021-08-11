//module
import { NgModule } from '@angular/core';
import { ParentRoutingModule } from './parent.routing';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { MatSliderModule, MatIconModule, MatStepperModule, MatAutocompleteModule, MatChipsModule, MatTooltipModule, MatProgressBarModule } from '@angular/material';
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
