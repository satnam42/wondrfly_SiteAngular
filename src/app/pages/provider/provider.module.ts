import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderRoutingModule } from './provider-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { ProgramProviderComponent } from './program-provider/program-provider.component';
import { ProviderComponent } from './provider.component';
import { AgmCoreModule } from '@agm/core';
import { RatingModule } from 'src/app/core/components/rating/rating.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
@NgModule({
  declarations: [ProviderComponent, ProgramProviderComponent],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    CoreModule,
    RatingModule,
    AgmCoreModule,
    LazyLoadImageModule,
  ]
})
export class ProviderModule { }
