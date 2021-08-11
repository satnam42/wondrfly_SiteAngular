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

  { path: 'term-condition', loadChildren: './/pages/term-condition/term-condition.module#TermConditionModule' },
  { path: 'about-wondrfly', loadChildren: './/pages/why-wondrfly/why-wondrfly.module#WhyWondrflyModule' },
  { path: 'search', component: SearchComponent },
  { path: 'forgot-password', loadChildren: './/pages/forgot-password/forgot-password.module#ForgotPasswordModule' },
  { path: 'sign-up-guardian', component: SignUpGuardianComponent },
  { path: 'ambassador-policy', loadChildren: './/pages/ambassador-policy/ambassador-policy.module#AmbassadorPolicyModule' },
  { path: 'privacyPolicy', loadChildren: './/pages/privacy-policy/privacy-policy.module#PrivacyPolicyModule' },
  { path: 'contactUs', loadChildren: './/pages/contact-us/contact-us.module#ContactUsModule' },

  {
    path: 'profile/:id', component: ProfileComponent,
    canActivate: [UserGuard],
    data: { roles: [Role.Provider,] }
  },
  {
    path: 'loginProvider', component: LoginProviderComponent, canActivate: [UserGuard],
    data: { roles: [Role.Provider,] }
  },

  {
    path: 'chat', canActivate: [UserGuard],
    loadChildren: () => import('.//pages/chat/chat.module').then(m => m.ChatModule),
  },
  {
    path: '', component: ProgramComponent, children: [
      {
        path: 'program',
        loadChildren: () => import('.//pages/provider/program/program.module').then(m => m.ProgramModule),
        // data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' }
      },
      {
        path: 'program-provider/:name/:id',
        loadChildren: () => import('.//pages/provider/program-provider/program-provider.module').then(m => m.ProgramProviderModule),
      },
    ]
  },
  {
    path: '', component: ParentComponent, children: [
      {
        path: '',
        loadChildren: () => import('.//pages/parent/parent.module').then(m => m.ParentModule),
        // data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' }
      },
    ]
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
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
