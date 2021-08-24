import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderRoutingModule } from './provider-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { LoginProviderComponent } from './login-provider/login-provider.component';
import { PhonePipe, ProfileComponent } from './profile/profile.component';
import { ProgramProviderComponent } from './program-provider/program-provider.component';
import { ProviderComponent } from './provider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { RatingModule } from 'src/app/core/components/rating/rating.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { LazyLoadImageModule } from 'ng-lazyload-image';
@NgModule({  declarations: [ProviderComponent ,LoginProviderComponent,ProfileComponent,ProgramProviderComponent,PhonePipe],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    CoreModule,
    FormsModule,
    RatingModule,
    ReactiveFormsModule,
    AgmCoreModule,
    AutocompleteLibModule,
    LazyLoadImageModule,
  ]
})
export class ProviderModule { }
