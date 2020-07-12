import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  UserSummary,
  CredentialsViewModel,
  MicrosoftOptions,
  MicrosoftAuthViewModel,
  anonymousUser
} from './account.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl: string;
  private cachedUser: UserSummary;

  constructor(
    private http: HttpClient,
    private router: Router,
    private platformLocation: PlatformLocation,
    private snackBar: MatSnackBar
  ) {
    this.baseUrl = environment.server; //  + environment.apiUrl + 'auth';
    this.cachedUser = anonymousUser();
    const cu = localStorage.getItem('currentUser');
    if (cu) {
      this.cachedUser = JSON.parse(cu);
      if (!this.isAnonymous) {
        // renew the user roles and token
        this.loginCompleteHandler(false, this.verifyUser(this.cachedUser));
      }
    }
  }

  get user(): UserSummary {
    return this.cachedUser;
  }
  get isAnonymous(): boolean {
    return this.cachedUser.name === 'Anonymous';
  }

  public login() {
    this.cachedUser = anonymousUser();
    localStorage.removeItem('currentUser');
    this.router.navigate(['/account/login']);
  }

  /*
    Name and password login
  */
  public loginPassword(credentials: CredentialsViewModel) {
    this.loginCompleteHandler(false,
      this.http.post<UserSummary>(this.baseUrl + 'login', credentials)
    );
  }

  public logout() {
    this.cachedUser = anonymousUser();
    localStorage.removeItem('currentUser');

    this.http.post<any>(this.baseUrl + '/logout', {}).subscribe(() => {
      this.router.navigate(['./account/logout']);
    });
  }

  public loginMicrosoftOptions(): Observable<MicrosoftOptions> {
    return this.http.get<MicrosoftOptions>(
      this.baseUrl + 'external/microsoft'
    );
  }

  public loginMicrosoftCallback(code: string, state: string) {
    this.snackBar.open('Validating Login...', '', { duration: 8000 });
    const body = { accessToken: code, state, baseHref: this.platformLocation.getBaseHrefFromDOM() };
    this.loginCompleteHandler(true,
      this.http.post<UserSummary>(this.baseUrl + 'external/microsoft', body)
    );
  }

  private verifyUser(user: UserSummary): Observable<UserSummary> {
    const model = {};
    const options = !user || !user.jwtToken ? {}
      : { headers : { Authorization: 'Bearer ' + user.jwtToken }};
    return this.http.post<UserSummary>(
      this.baseUrl + 'verify',
      model,
      options
    );
  }

  private loginCompleteHandler(navigate: boolean, caller: Observable<UserSummary>) {
    caller.subscribe(
      user => {
        this.loginComplete(user);
      },
      resp => {
        console.error(resp);
        this.snackBar.open(resp.error.message, 'Ok');
        if (navigate) {
          this.router.navigate(['unauthorized']);
        }
      }
    );
  }

  private loginComplete(data: UserSummary) {
    this.cachedUser = data;
    localStorage.setItem('currentUser', JSON.stringify(data));
    if (!data.roles || data.roles.length === 0) {
      // no access?  shouldn't happen, redirect to a page not needing login
      this.snackBar.open('No Access', '', { duration: 3000 });
      this.router.navigate(['unauthorized']);
    } else {
      this.snackBar.open('Login Complete', '', { duration: 3000 });
      const returnUrl = localStorage.getItem('loginReturnUrl') || '';
      this.router.navigate([returnUrl]);
    }
  }

}
