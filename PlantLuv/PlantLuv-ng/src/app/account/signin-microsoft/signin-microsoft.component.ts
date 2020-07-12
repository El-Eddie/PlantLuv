import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin-microsoft',
  templateUrl: './signin-microsoft.component.html',
  styleUrls: ['./signin-microsoft.component.scss']
})
export class SigninMicrosoftComponent {

  constructor(
    public route: ActivatedRoute,
    private accountService: AccountService
  ) {
    // params: 'code', 'session_state'
    this.route.queryParamMap.subscribe(prms => {
      const code = prms.get('code') || '';
      const sessionState = prms.get('session_state') || '';
      if (code) {
        this.accountService.loginMicrosoftCallback(code, sessionState);
      }
    });
   }

}
