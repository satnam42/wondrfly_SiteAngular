import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
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
import { RouterModule } from '@angular/router';
import { ImageCropModule } from './components/image-crop/image-crop.module';
import { SignupPopupComponent } from './components/signup-popup/signup-popup.component';
import { RatingComponent } from './components/rating/rating.component';
import { HttpClientJsonpModule } from '@angular/common/http';
import { MailchimpSubscribeForm } from './components/mailchimp-subscribe-form/mailchimp-subscribe-form.component';
import { MarkdwonPipe } from './shared/markdwon.pipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PhonePipe } from '../pages/provider/profile/profile.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PhoneMaskDirective } from './common/phone-mask.directive';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

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
  RatingComponent,
  MailchimpSubscribeForm,
  MarkdwonPipe,
  PhoneMaskDirective,
  PhonePipe,

]

const thirdPartyModules = [
  MatToolbarModule,
  MatButtonModule,
  MatTabsModule,
  InfiniteScrollModule,
  MatSnackBarModule,
  MatIconModule,
  ChartsModule,
  MatFormFieldModule,
  MatCheckboxModule,
  NgxSliderModule,
  MatRadioModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatDialogModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSidenavModule,
  MatExpansionModule,
  NgxUiLoaderModule,
  MatListModule,
  NgxFileDropModule,
  Ng2SearchPipeModule,
  AutocompleteLibModule,
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
    AutocompleteLibModule,
    HttpClientJsonpModule,
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
