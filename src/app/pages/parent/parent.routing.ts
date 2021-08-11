import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginParentComponent } from './login-parent/login-parent.component'
import { ParentProfileComponent } from './parent-profile/parent-profile.component';
import { UserGuard } from 'src/app/core/guards';
import { Role } from 'src/app/core/models/role.model';
export const routes: Routes = [
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'loginParent', component: LoginParentComponent, canActivate:
            [UserGuard],
            data: {
                roles: [
                  Role.Parent,
                ]
              }
    },
    {
        path: 'Profile/:id', component: ParentProfileComponent, canActivate:
            [UserGuard],
            data: {
                roles: [
                  Role.Parent,
                ]
              }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParentRoutingModule { }



