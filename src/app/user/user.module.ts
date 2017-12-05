import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './../home/login/login.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'register', component: RegisterComponent },
      { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
      { path: 'password', canActivate: [AuthGuard], component: PasswordComponent },
      { path: 'logout', canActivate: [AuthGuard], component: LogoutComponent }
    ])
  ],
  declarations: [
    RegisterComponent,
    ProfileComponent,
    PasswordComponent,
    LogoutComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService
  ]
})
export class UserModule { }
