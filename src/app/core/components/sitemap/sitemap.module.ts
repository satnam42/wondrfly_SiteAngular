import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitemapComponent } from './sitemap.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../../core.module';

const routes: Routes = [
  {
    path: '', component: SitemapComponent,
  }
]


@NgModule({
  declarations: [SitemapComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
  ]
})
export class SitemapModule { }
