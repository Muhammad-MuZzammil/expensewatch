import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import 'rxjs/Rx';


import { AppComponent } from './app.component';
import { LoginComponent } from './home/login/login.component';
import { AboutComponent } from './home/about/about.component';

//Feature Modules
import { UserModule } from './user/user.module';

// common Modules
import { ToastrService } from './common/toastr.service';
import { PasswordComponent } from './user/password/password.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';



@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UserModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'about', component: AboutComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: '' }
    ])
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    PasswordComponent,
    ProfileComponent,
    RegisterComponent
  ],

  bootstrap: [AppComponent],
  providers: [ToastrService]
})
export class AppModule { }
