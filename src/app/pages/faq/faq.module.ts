import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqRoutingModule } from './faq-routing.module';
import { FaqHomeComponent } from './faq-home/faq-home.component';
import { FaqHelpDeskComponent } from './faq-help-desk/faq-help-desk.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FaqComponent } from './faq.component';


@NgModule({
  declarations: [FaqHomeComponent,FaqHelpDeskComponent,SearchResultComponent, FaqComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    CoreModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class FaqModule { }
