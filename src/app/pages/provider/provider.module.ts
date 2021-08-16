import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderRoutingModule } from './provider-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { LoginProviderComponent } from './login-provider/login-provider.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgramProviderComponent } from './program-provider/program-provider.component';
import { ProviderComponent } from './provider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [ProviderComponent ,LoginProviderComponent,ProfileComponent,ProgramProviderComponent],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_5P0pxn1q9hvvTeCr3YCsDhLJoHwxs2c',
      libraries: ['places']
    }),
  ]
})
export class ProviderModule { }
