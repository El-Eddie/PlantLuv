import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../plant.model';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  plantList$: Observable<Plant[]>;
  filterValue: string;
  loggedInUserID: number;

  constructor(
    private plantService: PlantService,
  ) { }

  ngOnInit(): void {
    this.loggedInUserID = 1;
    this.GetUserPlants(this.loggedInUserID);
  }

  GetUserPlants(id: number){
    this.plantList$ = this.plantService.getUserPlants(id);
  }

  updateFilter(thing: string){
    // TODO: implement searching
  }
}
