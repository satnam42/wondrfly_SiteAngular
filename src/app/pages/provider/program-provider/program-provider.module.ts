import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ProgramProviderComponent } from './program-provider.component';
import { AgmCoreModule } from '@agm/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
// import { AgmCoreModule } from '@agm/core';
const routes: Routes = [
  {
    path: '', component: ProgramProviderComponent,
  }
]
@NgModule({
  declarations: [ProgramProviderComponent],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    CustomFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    AutocompleteLibModule,
    MatChipsModule,
    AutocompleteLibModule,
    MatIconModule,

    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyCgd-rD47NFwKVpQ30skw_D-qWUMHrxjO4',
      apiKey: 'AIzaSyD_5P0pxn1q9hvvTeCr3YCsDhLJoHwxs2c',
      libraries: ['places']
    }),
    NgxUiLoaderModule,
    RouterModule.forChild(routes)
  ]
})
export class ProgramProviderModule { }
