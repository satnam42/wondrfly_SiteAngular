
import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForumViewComponent } from './forum-view/forum-view.component';
import { ForumRoutingModule } from './forum.routing';
import { ForumListComponent } from './forum-list/forum-list.component';
import { ForumTypeComponent } from './forum-type/forum-type.component';
import { ForumComponent } from './forum.component';



@NgModule({
    entryComponents: [],
    declarations: [
        ForumViewComponent, ForumListComponent, ForumTypeComponent, ForumComponent

    ],
    imports: [
        CommonModule,
        ForumRoutingModule,
        FormsModule,
        CustomFormsModule,
        ReactiveFormsModule,
        CoreModule,
    ],
    exports: [
        ForumComponent,ForumViewComponent, ForumListComponent, ForumTypeComponent
    ]
})
export class ForumModule { }
