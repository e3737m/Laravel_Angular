import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';


import { UserComponent } from './user/user.component';
import { UserService } from './services/user.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NavComponent } from './nav/nav.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserDataComponent } from './user-data/user-data.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModuleModule } from './routing-module.module';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';





@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    UserDetailComponent,
    NavComponent,
    UserDataComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    RoutingModuleModule
  ],
  providers: [UserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
