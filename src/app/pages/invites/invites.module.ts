import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitesComponent } from './invites.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  {
    path: '', component: InvitesComponent,
  }
]


@NgModule({
  declarations: [
    InvitesComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
  ]
})
export class InvitesModule { }
