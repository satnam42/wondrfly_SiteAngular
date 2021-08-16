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
        // GoogleMapsModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyD_5P0pxn1q9hvvTeCr3YCsDhLJoHwxs2c',
          libraries: ['places']
        }),
    ],
    exports: [
        ParentComponent, LoginParentComponent, ParentProfileComponent
    ]
})
export class ParentModule { }
