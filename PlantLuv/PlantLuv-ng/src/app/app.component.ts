import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'PlantLuv';
  updateFilter$: Observable<boolean>; //should this be an observable?

  constructor(private router: Router) { }

  updateFilter(thing: string) {
    // TODO: implement function to search and pass results to DashboardComponent
  }
  openUserSettings() {
    // TODO: Create and call user settings page/dialog box
  }
  userLogout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['plantluv.net'])
  }
}
