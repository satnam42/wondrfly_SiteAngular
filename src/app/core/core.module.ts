import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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



const components = [
  HeaderComponent,
  FooterComponent,
  Header2Component,
  Footer2Component,
  AlertComponent,
  CookiesPopupComponent
]
const thirdPartyModules = [
  MatIconModule,
  MatChipsModule,
  NgxUiLoaderModule,
DateFormateModule,

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
    ...thirdPartyModules,
  ],
  declarations: [...components ],
  exports: [...thirdPartyModules, ...components],
  entryComponents: [],
  providers: [
    ...services, ...guards,
  ]
})
export class CoreModule { }
