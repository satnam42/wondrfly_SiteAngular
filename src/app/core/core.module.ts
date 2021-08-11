import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ToastyModule } from 'ng2-toasty';

import {
  MatToolbarModule,
  MatButtonModule,
  MatTabsModule,
  MatSnackBarModule,
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatDialogModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSidenavModule,
  MatExpansionModule,
  MatListModule,
  MatSlideToggleModule
} from '@angular/material';

import { FooterComponent } from '../../app/core/components/footer/footer.component';
import { HeaderComponent } from '../../app/core/components/header/header.component';
import { AuthsService } from './services/auths.service';
import { UserGuard } from './guards/user.guard';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { Header2Component } from './components/header2/header2.component';
import { Footer2Component } from './components/footer2/footer2.component';
import { AlertComponent } from './components/alert/alert.component';
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { ImageCropComponent } from './components/image-crop/image-crop.component';
import { RouterModule } from '@angular/router';
import { ImageCropModule } from './components/image-crop/image-crop.module';
import { SignupPopupComponent } from './components/signup-popup/signup-popup.component';
import { PhoneMaskDirective } from './common/phone-mask.directive';
import { RatingComponent } from './components/rating/rating.component';
import { OnlineProgramsComponent } from './components/online-programs/online-programs.component';
import { HttpClientJsonpModule } from '@angular/common/http';
import { MailchimpSubscribeForm } from './components/mailchimp-subscribe-form/mailchimp-subscribe-form.component';
import { MarkdwonPipe } from './shared/markdwon.pipe';
const components = [
  HeaderComponent,
  FooterComponent,
  BreadcrumbComponent,
  CarouselComponent,
  DragDropComponent,
  Header2Component,
  Footer2Component,
  AlertComponent,
  ReadMoreComponent,
  SocialLoginComponent,
  SignupPopupComponent,
  PhoneMaskDirective,
  RatingComponent,
  OnlineProgramsComponent,
  MailchimpSubscribeForm,
  MarkdwonPipe

]

const thirdPartyModules = [
  ToastyModule,
  MatToolbarModule,
  MatButtonModule,
  MatTabsModule,
  MatSnackBarModule,
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatDialogModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSidenavModule,
  MatExpansionModule,
  MatListModule,
  NgxFileDropModule,
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  MatSlideToggleModule,
  ImageCropModule,
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
    HttpClientJsonpModule,
    // BrowserAnimationsModule,
    ReactiveFormsModule,
    ...thirdPartyModules,
  ],
  declarations: [...components, ],
  exports: [...thirdPartyModules, ...components],
  entryComponents: [],
  providers: [
    ...services, ...guards,
  ]
})
export class CoreModule { }
