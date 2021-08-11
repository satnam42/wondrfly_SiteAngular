import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { RouterModule } from '@angular/router';
import { BlogsRoutes } from './blogs.routing';
import { CoreModule } from 'src/app/core/core.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogSearchComponent } from './blog-search/blog-search.component';
import { BlogsComponent } from './blogs.component';


@NgModule({
  declarations: [BlogPageComponent, BlogDetailComponent, BlogSearchComponent, BlogsComponent ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FormsModule,
    RouterModule.forChild(BlogsRoutes)
  ]
})
export class BlogsModule { }
