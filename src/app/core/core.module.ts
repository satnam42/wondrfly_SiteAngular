import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../app/core/components/footer/footer.component';
import { HeaderComponent } from '../../app/core/components/header/header.component';
import { AuthsService } from './services/auths.service';
import { UserGuard } from './guards/user.guard';
import { Header2Component } from './components/header2/header2.component';
import { Footer2Component } from './components/footer2/footer2.component';
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { RouterModule } from '@angular/router';
import { HttpClientJsonpModule } from '@angular/common/http';
import { MarkdwonPipe } from './shared/markdwon.pipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
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
import { PhonePipe } from '../pages/provider/profile/profile.component';
import { PhoneMaskDirective } from './common/phone-mask.directive';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ChartsModule } from 'ng2-charts';


const components = [
  HeaderComponent,
  FooterComponent,
  Header2Component,
  Footer2Component,
  ReadMoreComponent,
  MarkdwonPipe,
  PhoneMaskDirective,
  PhonePipe,

]

const thirdPartyModules = [
  MatToolbarModule,
  MatButtonModule,
  MatTabsModule,
  MatIconModule,
  ChartsModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatRadioModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatDialogModule,
  MatChipsModule,
  MatCardModule,
  MatSidenavModule,
  MatExpansionModule,
  NgxUiLoaderModule,
  MatListModule,
  
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
