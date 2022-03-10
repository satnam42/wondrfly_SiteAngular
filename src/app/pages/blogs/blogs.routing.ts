import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogSearchComponent } from './blog-search/blog-search.component';
import { BlogsComponent } from './blogs.component';



export const BlogsRoutes: Routes = [
  {
    path: '', component: BlogsComponent, children: [
      { path: '', component: BlogPageComponent },
      { path: ':title/:id', component: BlogDetailComponent, },
      { path: 'category/:name/:id', component: BlogSearchComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(BlogsRoutes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
