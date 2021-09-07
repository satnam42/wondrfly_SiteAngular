import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginParentComponent } from './login-parent/login-parent.component'
import { ParentProfileComponent } from './parent-profile/parent-profile.component';
import { UserGuard } from 'src/app/core/guards';
import { Role } from 'src/app/core/models/role.model';
import { ParentComponent } from './parent.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
export const routes: Routes = [
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: '', component: ParentComponent,
     children:[
    {
        path: 'login-parent', component: LoginParentComponent, canActivate:
            [UserGuard],
            data: {
                roles: [
                  Role.Parent,
                ]
              }
    },
    {
      path: 'suggestion', component: SuggestionComponent, canActivate:
          [UserGuard],
          data: {
              roles: [
                Role.Parent,
              ]
            }
  },
    {
        path: 'profile/:id', component: ParentProfileComponent, canActivate:
            [UserGuard],
            data: {
                roles: [
                  Role.Parent,
                ]
              }
    },
  ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParentRoutingModule { }



