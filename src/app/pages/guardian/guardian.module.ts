//module
import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { MatSliderModule, MatIconModule, MatStepperModule, MatAutocompleteModule, MatChipsModule, MatTooltipModule } from '@angular/material';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CustomFormsModule } from 'ng2-validation';
// import { AgmCoreModule } from '@agm/core';

// components
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AgmCoreModule } from '@agm/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ProfileComponent } from './profile/profile.component';
import { GuardianRoutingModule } from './guardian.routing';
import { ChildrenComponent } from './children/children.component';
@NgModule({
    entryComponents: [],
    declarations: [
        ProfileComponent,
        ChildrenComponent
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
        GuardianRoutingModule,
        AutocompleteLibModule,
        InfiniteScrollModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD_5P0pxn1q9hvvTeCr3YCsDhLJoHwxs2c',
            libraries: ['places']
        }),
    ],
    exports: [ProfileComponent, ChildrenComponent]
})
export class GuardianModule { }
