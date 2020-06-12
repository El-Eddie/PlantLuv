import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store'

import { Plant } from '../models/plant.model';
import { PlantType } from '../models/plant-type.model'
import { PlantService } from '../service/plant.service';
import { PlantTypeService } from '../service/plant-type.service';
import { TypeDetailsComponent } from '../type-details/type-details.component'

@Component({
  selector: 'app-plant-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  plantList$: Observable<Plant[]>;
  typeList$: Observable<PlantType[]>;
  filterValue: string = "";
  loggedInUserID: number;
  // dashboardDisplay$: Observable<string>;
  dashboardDisplay$: string;

  constructor(
    private plantService: PlantService,
    private typeService: PlantTypeService,
    private typeDialog: MatDialog,
    private store: Store<{page: string}>
  ) {
    // this.dashboardDisplay$ = this.store.pipe(select("page"));
    store.pipe(select('page')).subscribe( p => {
      this.dashboardDisplay$ = p})
  }

  ngOnInit(): void {
    this.loggedInUserID = 1;
    this.GetUserPlants(this.loggedInUserID);
    this.getPlantTypes(this.filterValue);
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
  getPlantTypes(criteria: string){
    this.typeList$ = this.typeService.search(criteria)
  }

  updateFilter(value: string){}

  displayDetailsCard(type: string){
    console.log(type)
    this.typeService.grab(type).subscribe(plantType => {
      console.log(plantType)
      console.log("")
      this.typeDialog.open(TypeDetailsComponent, { data: plantType });
      // dialogRef.afterClosed().subscribe(result => {console.log("dialog closed")})
    })

  }
}
