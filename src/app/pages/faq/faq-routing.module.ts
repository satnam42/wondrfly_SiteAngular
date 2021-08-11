import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqHelpDeskComponent } from './faq-help-desk/faq-help-desk.component';
import { FaqHomeComponent } from './faq-home/faq-home.component';
import { FaqComponent } from './faq.component';
import { SearchResultComponent } from './search-result/search-result.component';


const routes: Routes = [
  {path: '', component: FaqComponent, children:[
  { path: '', component: FaqHomeComponent },
  { path: 'search', component: SearchResultComponent },
  { path: ':role/:question/:id', component: FaqHelpDeskComponent, },
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
