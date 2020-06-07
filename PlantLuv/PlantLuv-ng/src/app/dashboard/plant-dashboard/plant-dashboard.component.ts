import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../plant.model';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-plant-dashboard',
  templateUrl: './plant-dashboard.component.html',
  styleUrls: ['./plant-dashboard.component.scss']
})
export class PlantDashboardComponent implements OnInit {

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

  waterPlant(id: number){
    let results = this.plantService.waterPlant(id);
    results.subscribe(plant => {
      if(plant){
        console.log(plant);
        alert("Your "+plant.species+" plant has been marked as watered.")
      } else {
        alert("There was a problem recording your action.\n Please try again later.")
      }
    })
   }

  fertalizePlant(id: number){
    let results = this.plantService.fertalizePlant(id);
    results.subscribe(plant => {
      if(plant){
        console.log(plant);
        alert("Your "+plant.species+" plant has been marked as fed.")
      } else {
        alert("There was a problem recording your action.\n Please try again later.")
      }
    })
  }
  toggleFavorite(id: number){
    this.plantService.toggleFavorite(id)
  }

  toggleAlerts(id: number){
    this.plantService.toggleAlerts(id)
  }
  deletePlant(id: number){
    console.log(id+" made it to the dashboard component")
    this.plantService.delete(id)
  }

}
