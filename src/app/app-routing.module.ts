import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramComponent } from './pages/provider/program/program.component';
import { ParentComponent } from './pages/parent/parent.component';
import { LandingComponent } from './pages/landing/landing.component';
import { UserGuard } from './core/guards';
import { SignUpGuardianComponent } from './pages/sign-up-guardian/sign-up-guardian.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { ProfileComponent } from './pages/provider/profile/profile.component';
import { LoginProviderComponent } from './pages/provider/login-provider/login-provider.component';
import { Role } from './core/models/role.model';
// main routes
const routes: Routes = [

  { path: '', component: LandingComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },

  { path: 'term-condition', loadChildren: () => import('.//pages/term-condition/term-condition.module').then(m => m.TermConditionModule) },
  { path: 'about-wondrfly', loadChildren: () => import('.//pages/why-wondrfly/why-wondrfly.module').then(m => m.WhyWondrflyModule) },
  { path: 'search', component: SearchComponent },
  { path: 'forgot-password', loadChildren: () => import('.//pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'sign-up-guardian', component: SignUpGuardianComponent },
  { path: 'ambassador-policy', loadChildren: () => import('.//pages/ambassador-policy/ambassador-policy.module').then(m => m.AmbassadorPolicyModule) },
  { path: 'privacyPolicy', loadChildren: () => import('.//pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
  { path: 'contactUs', loadChildren: () => import('.//pages/contact-us/contact-us.module').then(m => m.ContactUsModule) },

  {
    path: 'chat', canActivate: [UserGuard],
    loadChildren: () => import('.//pages/chat/chat.module').then(m => m.ChatModule),
  },
      {
        path: 'program',
        loadChildren: () => import('.//pages/provider/program/program.module').then(m => m.ProgramModule),
        // data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' }
      },

      {
        path: '',
        loadChildren: () => import('.//pages/provider/provider.module').then(m => m.ProviderModule),
      },
      {
        path: '',
        loadChildren: () => import('.//pages/parent/parent.module').then(m => m.ParentModule),
        // data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' }
      },

      {
        path: 'forum',
        loadChildren: () => import('.//pages/forum/forum.module').then(m => m.ForumModule),
      },

      {
        path: 'faq',
        loadChildren: () => import('.//pages/faq/faq.module').then(m => m.FaqModule),
      },

      {
        path: 'blogs',
        loadChildren: () => import('.//pages/blogs/blogs.module').then(m => m.BlogsModule),
      },


  { path: '**', redirectTo: 'search' },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: false, enableTracing: true })],
  imports: [RouterModule.forRoot(routes, { useHash: false, relativeLinkResolution: 'legacy' })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
