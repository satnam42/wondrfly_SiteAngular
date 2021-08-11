import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumListComponent } from './forum-list/forum-list.component';
import { ForumViewComponent } from './forum-view/forum-view.component';
import { ForumTypeComponent } from './forum-type/forum-type.component';
import { UserGuard } from 'src/app/core/guards';
import { ForumComponent } from './forum.component';
export const routes: Routes = [
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: '', component: ForumComponent, children:[
    {
        path: '', component: ForumTypeComponent,canActivate:[UserGuard]
    },
    {
        path: 'forum-list/:id', component: ForumListComponent, canActivate: [UserGuard]
    },
    {
        path: 'forum/:id', component: ForumViewComponent, canActivate: [UserGuard]
    },
    ]
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ForumRoutingModule { }



