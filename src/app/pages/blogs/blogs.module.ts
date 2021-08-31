import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { RouterModule } from '@angular/router';
import { BlogsRoutes } from './blogs.routing';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogSearchComponent } from './blog-search/blog-search.component';
import { BlogsComponent } from './blogs.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MarkdownModule } from 'src/app/core/shared/markdown/markdown.module';
import { ReadMoreModule } from 'src/app/core/components/read-more/read-more.module';


@NgModule({
  declarations: [BlogPageComponent, BlogDetailComponent, BlogSearchComponent, BlogsComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    ReadMoreModule,
    MarkdownModule,
    LazyLoadImageModule,
    RouterModule.forChild(BlogsRoutes)
  ]
})
export class BlogsModule { }
