//module
import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CustomFormsModule } from 'ng2-validation';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
// import { AgmCoreModule } from '@agm/core';

// components
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForumViewComponent } from './forum-view/forum-view.component';
import { ForumRoutingModule } from './forum.routing';
import { ForumListComponent } from './forum-list/forum-list.component';
import { ForumTypeComponent } from './forum-type/forum-type.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ForumComponent } from './forum.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
    entryComponents: [],
    declarations: [
        ForumViewComponent, ForumListComponent, ForumTypeComponent, ForumComponent

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
        ForumRoutingModule,
        AutocompleteLibModule,
        Ng2SearchPipeModule,
        // AgmCoreModule.forRoot({
        //     apiKey: 'AIzaSyCayIBisLl_xmSOmS3g524FAzEI-ZhT1sc'
        // }),

    ],
    exports: [
        ForumViewComponent, ForumListComponent, ForumTypeComponent
    ]
})
export class ForumModule { }
