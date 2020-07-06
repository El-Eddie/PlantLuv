import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutCompleteComponent } from './logout-complete/logout-complete.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SigninMicrosoftComponent } from './signin-microsoft/signin-microsoft.component';



@NgModule({
  declarations: [LoginComponent, LogoutCompleteComponent, UnauthorizedComponent, SigninMicrosoftComponent],
  imports: [
    CommonModule
  ]
})
export class AccountModule { }
