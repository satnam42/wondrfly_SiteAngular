import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonPagesRoutingModule } from './common-pages-routing.module';
import { TermConditionComponent } from './term-condition/term-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { WhyWondrflyComponent } from './why-wondrfly/why-wondrfly.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CoreModule } from 'src/app/core/core.module';
import { MarkdownModule } from 'src/app/core/shared/markdown/markdown.module';
import { AboutJoinBetaComponent } from './about-join-beta/about-join-beta.component';
import { MoreResourcesComponent } from './more-resources/more-resources.component';
import { MailchimpSubscribeFormModule } from 'src/app/core/components/mailchimp-subscribe-form/mailchimp-subscribe-form.module';
import { ReadMoreModule } from 'src/app/core/components/read-more/read-more.module';



@NgModule({
  declarations: [TermConditionComponent, PrivacyPolicyComponent, WhyWondrflyComponent, AboutJoinBetaComponent, MoreResourcesComponent],
  imports: [
    CommonModule,
    CoreModule,
    CommonPagesRoutingModule,
    LazyLoadImageModule,
    MarkdownModule,
    MailchimpSubscribeFormModule,
    ReadMoreModule
  ]
})
export class CommonPagesModule { }
