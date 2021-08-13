import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/core/guards';
import { Role } from 'src/app/core/models/role.model';
import { LoginProviderComponent } from './login-provider/login-provider.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgramProviderComponent } from './program-provider/program-provider.component';
import { ProviderComponent } from './provider.component';

const routes: Routes = [

  {path: '', component: ProviderComponent, children:[
    {
      path: 'loginProvider', component: LoginProviderComponent, canActivate: [UserGuard],
      data: { roles: [Role.Provider,] }
    },
    {
      path: 'profile/:id', component: ProfileComponent,
      canActivate: [UserGuard],
      data: { roles: [Role.Provider,] }
    },
    {
        path: 'program-provider/:name/:id', component: ProgramProviderComponent
    },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
