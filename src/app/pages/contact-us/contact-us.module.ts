import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


const routes: Routes = [
  {
    path: '', component: ContactUsComponent,
  }
]

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactUsModule { }
