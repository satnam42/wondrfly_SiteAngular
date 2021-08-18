//module
import { NgModule } from '@angular/core';
import { ParentRoutingModule } from './parent.routing';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';
import { LoginParentComponent } from './login-parent/login-parent.component'
import { ParentProfileComponent } from './parent-profile/parent-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgxMaskModule } from 'ngx-mask';
import { ParentComponent } from './parent.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
@NgModule({
    entryComponents: [],
    declarations: [
        ParentComponent,LoginParentComponent, ParentProfileComponent

    ],
    imports: [
        CommonModule,
        ParentRoutingModule,
        FormsModule,
        CoreModule,
        CustomFormsModule,
        ReactiveFormsModule,
        NgxMaskModule,
        AutocompleteLibModule,
        InfiniteScrollModule,
        // GoogleMapsModule,
        AgmCoreModule
    ],
    exports: [
        ParentComponent, LoginParentComponent, ParentProfileComponent
    ]
})
export class ParentModule { }
