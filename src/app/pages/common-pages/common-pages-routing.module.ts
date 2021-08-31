import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermConditionComponent } from './term-condition/term-condition.component';
import { WhyWondrflyComponent } from './why-wondrfly/why-wondrfly.component';

const routes: Routes = [
  {path: 'term-condition' , component:TermConditionComponent},
  {path: 'about-wondrfly', component:WhyWondrflyComponent},
  {path: 'privacyPolicy', component: PrivacyPolicyComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonPagesRoutingModule { }