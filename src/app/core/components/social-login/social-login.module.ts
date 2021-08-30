import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLoginComponent } from './social-login.component';
import { SocialLoginModule, FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';


@NgModule({
  declarations: [SocialLoginComponent],
  imports: [
    CommonModule,
    SocialLoginModule
  ],
  exports:[SocialLoginComponent],
  providers:[
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('335753464827-9pllubf5hlm97nf893j5rfhvmvcv28hi.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '2938106953127281'
            )
          },
        ]
      } as SocialAuthServiceConfig,
    }    

  ]
})
export class SocialModule { }
