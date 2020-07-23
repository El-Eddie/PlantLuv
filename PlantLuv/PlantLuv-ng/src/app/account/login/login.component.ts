import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlatformLocation } from '@angular/common';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    public route: ActivatedRoute,
    private accountService: AccountService,
    public snackBar: MatSnackBar,
    private platformLocation: PlatformLocation
  ) {

    this.snackBar.open('Authorizing with Microsoft...', '', { duration: 2000 });
    const baseUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?';
    this.accountService.loginMicrosoftOptions().subscribe(opts => {
      const options: {[key: string]: string} = {
        ...opts,
        response_type: 'code',
        redirect_uri: window.location.origin + this.platformLocation.getBaseHrefFromDOM() + 'signin-microsoft',
      };

      let params = new HttpParams();
      for (const key of Object.keys(options)) {
        params = params.set(key, options[key]); // encodes values automatically.
      }

      window.location.href = baseUrl + params.toString();
    });

   }
}
