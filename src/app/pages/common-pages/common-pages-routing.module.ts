import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/core/guards';
import { Role } from 'src/app/core/models/role.model';
import { AboutJoinBetaComponent } from './about-join-beta/about-join-beta.component';
import { MoreResourcesComponent } from './more-resources/more-resources.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermConditionComponent } from './term-condition/term-condition.component';
import { WhyWondrflyComponent } from './why-wondrfly/why-wondrfly.component';

const routes: Routes = [
  {path: 'term-condition' , component:TermConditionComponent},
  {path: 'about-wondrfly', component:WhyWondrflyComponent},
  {path: 'privacyPolicy', component: PrivacyPolicyComponent },
  {path: 'about-beta', component: AboutJoinBetaComponent },
  {path: 'resources', component: MoreResourcesComponent ,canActivate:
  [UserGuard],
  data: {
      roles: [
        Role.Parent,
      ]
    }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonPagesRoutingModule { }
