import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortUrlsRoutingModule } from './short-urls-routing.module';
import { ProviderDetailComponent } from './provider-detail/provider-detail.component';
import { SearchTopicsComponent } from './search-topics/search-topics.component';
import { ShortUrlsComponent } from './short-urls.component';


@NgModule({
  declarations: [
    ShortUrlsComponent,
    ProviderDetailComponent,
    SearchTopicsComponent
  ],
  imports: [
    CommonModule,
    ShortUrlsRoutingModule
  ]
})
export class ShortUrlsModule { }
