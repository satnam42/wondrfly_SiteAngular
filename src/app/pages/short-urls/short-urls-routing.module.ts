import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderDetailComponent } from './provider-detail/provider-detail.component';
import { SearchTopicsComponent } from './search-topics/search-topics.component';
import { ShortUrlsComponent } from './short-urls.component';
const routes: Routes = [
  {path: '', component: ShortUrlsComponent, children:[

    { path: 'topic/:topicname', component: SearchTopicsComponent },
    { path: 'p/:username', component: ProviderDetailComponent },
    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShortUrlsRoutingModule { }
