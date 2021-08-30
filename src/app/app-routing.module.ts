import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

// main routes
const routes: Routes = [

  { path: '', component: LandingComponent },
  // { path: '404', component: NotFoundComponent },
  { path: 'search', loadChildren: () => import('.//pages/search/search.module').then(m => m.SearchModule) },
  // { path: 'ambassador-policy', loadChildren: () => import('.//pages/ambassador-policy/ambassador-policy.module').then(m => m.AmbassadorPolicyModule) },
  { path: '', loadChildren: () => import('./pages/common-pages/common-pages.module').then(m => m.CommonPagesModule) },
  { path: 'contactUs', loadChildren: () => import('.//pages/contact-us/contact-us.module').then(m => m.ContactUsModule) },

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

      // {
      //   path: 'forum',
      //   loadChildren: () => import('.//pages/forum/forum.module').then(m => m.ForumModule),
      // },

      {
        path: 'faq',
        loadChildren: () => import('.//pages/faq/faq.module').then(m => m.FaqModule),
      },

      {
        path: 'blogs',
        loadChildren: () => import('.//pages/blogs/blogs.module').then(m => m.BlogsModule),
      },

  { path: '', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },


  { path: '**', redirectTo: 'search' },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: false, enableTracing: true })],
  imports: [RouterModule.forRoot(routes, { useHash: false, relativeLinkResolution: 'legacy' })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
