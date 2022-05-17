import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../app/core/components/footer/footer.component';
import { HeaderComponent } from '../../app/core/components/header/header.component';
import { AuthsService } from './services/auths.service';
import { UserGuard } from './guards/user.guard';
import { Header2Component } from './components/header2/header2.component';
import { Footer2Component } from './components/footer2/footer2.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { DateFormateModule } from './components/date-format/date-format.module';
import { AlertComponent } from './components/alert/alert.component';
import { CookiesPopupComponent } from './components/cookies-popup/cookies-popup.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LoaderFileComponent } from './components/loader-file/loader-file.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { RegWallComponent } from './components/reg-wall/reg-wall.component';

export function playerFactory() {
  return player;
}



const components = [
  HeaderComponent,
  FooterComponent,
  Header2Component,
  Footer2Component,
  AlertComponent,
  RegWallComponent,
  CookiesPopupComponent,
  LoaderFileComponent
]
const thirdPartyModules = [
  MatIconModule,
  MatChipsModule,
  NgxUiLoaderModule,
  DateFormateModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatSelectModule,
  // ImageCropModule,
];
const services = [
  AuthsService,

];
const guards = [
  UserGuard,
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    ...thirdPartyModules,
  ],
  declarations: [...components, LoaderFileComponent ],
  exports: [...thirdPartyModules, ...components],
  entryComponents: [],
  providers: [
    ...services, ...guards,DatePipe,
  ]
})
export class CoreModule { }
