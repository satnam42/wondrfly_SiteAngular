import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/core/guards';
import { ProfileComponent } from './profile/profile.component';
import { ChildrenComponent } from './children/children.component';
import { Role } from 'src/app/core/models/role.model';
export const routes: Routes = [
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'guardianProfile/:id', component: ProfileComponent, canActivate:
            [UserGuard],
            data: {
                roles: [
                  Role.Provider,
                ]
              }
    },
    {
        path: 'children/:id', component: ChildrenComponent, canActivate:
            [UserGuard],
            data: {
                roles: [
                  Role.Guardian,
                ]
              }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GuardianRoutingModule { }



