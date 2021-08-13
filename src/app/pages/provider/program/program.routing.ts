import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component'
import { AddComponent } from './add/add.component'
import { DetailComponent } from './detail/detail.component'
import { SettingComponent } from './setting/setting.component'
import { UserGuard } from 'src/app/core/guards';
import { Role } from 'src/app/core/models/role.model';
import { ProgramComponent } from './program.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: '', component: ProgramComponent, children:[
  {
    path: '', component: HomeComponent, canActivate:
      [UserGuard],
      data: {
        roles: [
          Role.Provider,
        ]
      }
  },
  {
    path: 'list',
    component: ListComponent, canActivate:
      [UserGuard],
      data: {
        roles: [
          Role.Provider,
        ]
      }
  },
  {
    path: 'add',
    component: AddComponent, canActivate:
      [UserGuard],
      data: {
        roles: [
          Role.Provider,
        ]
      }
  },
  {
    path: ':title/:id',
    component: DetailComponent,
    // data: { title: 'Detail', breadcrumb: 'Program-Detail' }
  },
  {
    path: 'setting',
    component: SettingComponent,
    canActivate:
      [UserGuard],
      data: {
        roles: [
          Role.Provider,
        ]
      }
  }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }



