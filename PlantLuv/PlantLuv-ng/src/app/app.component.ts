import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PlantLuv';

  updateFilter(thing: string){
    // TODO: implement function to search and pass results to DashboardComponent
  }
  openUserSettings() {
    // TODO: Create and call user settings page/dialog box
  }
}
