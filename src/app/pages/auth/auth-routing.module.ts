import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskToJoinComponent } from './ask-to-join/ask-to-join.component';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SignUpGuardianComponent } from './sign-up-guardian/sign-up-guardian.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'ask-to-join', component: AskToJoinComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up-guardian', component: SignUpGuardianComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
