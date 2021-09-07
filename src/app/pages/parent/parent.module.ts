//module
import { NgModule } from '@angular/core';
import { ParentRoutingModule } from './parent.routing';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';
import { LoginParentComponent } from './login-parent/login-parent.component'
import { ParentProfileComponent } from './parent-profile/parent-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgxMaskModule } from 'ngx-mask';
import { ParentComponent } from './parent.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { sharePopupModule } from 'src/app/core/components/share-popup/share-popup.module';
import { MatInputModule } from '@angular/material/input';
import { MarkdownModule } from 'src/app/core/shared/markdown/markdown.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MailchimpSubscribeFormModule } from 'src/app/core/components/mailchimp-subscribe-form/mailchimp-subscribe-form.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SuggestionComponent } from './suggestion/suggestion.component';
@NgModule({
    entryComponents: [],
    declarations: [
        ParentComponent,LoginParentComponent, ParentProfileComponent,SuggestionComponent

    ],
    imports: [
        CommonModule,
        ParentRoutingModule,
        FormsModule,
        CustomFormsModule,
        MatInputModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        AutocompleteLibModule,
        InfiniteScrollModule,
        CoreModule,
        AgmCoreModule,
        sharePopupModule,
        LazyLoadImageModule,
        MailchimpSubscribeFormModule,
        MarkdownModule,
    ],
    exports: [
        ParentComponent, LoginParentComponent, ParentProfileComponent,SuggestionComponent
    ]
})
export class ParentModule { }
