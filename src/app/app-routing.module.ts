
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ActiveUser } from './core/guards';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFound404Component } from './pages/not-found-404/not-found-404.component';


// main routes
const ROUTES: Routes = [

  { path: '', component: LandingComponent, canActivate: [ActiveUser] },
  { path: 'sign-up', loadChildren: () => import('.//pages/auth/sign-up/sign-up.module').then(m => m.SignUpModule) },
  { path: 'ask-to-join', loadChildren: () => import('.//pages/auth/ask-to-join/ask-to-join.module').then(m => m.AskToJoinModule) },
  { path: 'login', loadChildren: () => import('.//pages/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'sign-up-guardian', loadChildren: () => import('.//pages/auth/sign-up-guardian/sign-up-guardian.module').then(m => m.SignUpGuardianModule) },
  { path: 'forgot-password', loadChildren: () => import('.//pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'search', loadChildren: () => import('.//pages/search/search.module').then(m => m.SearchModule) },
  { path: '', loadChildren: () => import('./pages/common-pages/common-pages.module').then(m => m.CommonPagesModule) },
  { path: 'contactUs', loadChildren: () => import('.//pages/contact-us/contact-us.module').then(m => m.ContactUsModule) },
  { path: 'invite', loadChildren: () => import('.//pages/invites/invites.module').then(m => m.InvitesModule) },
  { path: 'sitemap', loadChildren: () => import('.//core/components/sitemap/sitemap.module').then(m => m.SitemapModule) },
  {
    path: 'program',
    loadChildren: () => import('.//pages/provider/program/program.module').then(m => m.ProgramModule),
  },

  {
    path: 'provider',
    loadChildren: () => import('.//pages/provider/provider.module').then(m => m.ProviderModule),
  },
  {
    path: 'parent',
    loadChildren: () => import('.//pages/parent/parent.module').then(m => m.ParentModule),
  },
  {
    path: 'faq',
    loadChildren: () => import('.//pages/faq/faq.module').then(m => m.FaqModule),
  },

  {
    path: 'blogs',
    loadChildren: () => import('.//pages/blogs/blogs.module').then(m => m.BlogsModule),
  },

  {
    path: '',
    loadChildren: () => import('.//pages/short-urls/short-urls.module').then(m => m.ShortUrlsModule),
  },
  { path: '404', component: NotFound404Component },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: false, enableTracing: true })],
  imports: [RouterModule.forRoot(ROUTES, {
    useHash: false, relativeLinkResolution: 'legacy', preloadingStrategy: PreloadAllModules
  },

  )],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
