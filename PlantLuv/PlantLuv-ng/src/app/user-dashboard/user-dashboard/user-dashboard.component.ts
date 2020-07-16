import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store'

import { Plant } from '../models/plant.model';
import { PlantType } from '../models/plant-type.model'
import { PlantService } from '../service/plant.service';
import { PlantTypeService } from '../service/plant-type.service';
import { TypeDetailsComponent } from '../type-details/type-details.component'
import { AddPlantComponent } from '../add-plant/add-plant.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-plant-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  plantList$: Observable<Plant[]>;
  typeList$: Observable<PlantType[]>;
  filterValue: string = "";
  loggedInUserID: string;
  snackbarDuration: number = 2500;
  tooltipDelay: number = 250;
  dashboardDisplay$: string;

  constructor(
    private plantService: PlantService,
    private typeService: PlantTypeService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private store: Store<{page: string}>
  ) {
    store.pipe(select('page')).subscribe( p => {
      this.dashboardDisplay$ = p})
  }

  ngOnInit(): void {
    this.loggedInUserID = "user@me.com";
    this.GetUserPlants(this.loggedInUserID);
    this.getPlantTypes(this.filterValue);
  }

  GetUserPlants(id: string){
    this.plantList$ = this.plantService.getUserPlants(id);
  }

  waterPlant(...ids: number[]){

    this.plantService.waterPlant(ids).subscribe((plants: Plant[]) => {
      if (plants.length > 1){
        var message = "Your plants have been marked as watered"
      } else {
        var message = plants[0].nickName ?
        `${plants[0].nickName} has been marked as watered` :
        `Your ${plants[0].commonName} has been marked as watered`
      }
      this.snackbar.open(message, null ,{
        duration: this.snackbarDuration
      });
    }, results => {
      alert("There was a problem recording your action.\n Please try again later.");
    });
   }


  fertalizePlant(...ids: number[]){
    this.plantService.fertalizePlant(ids).subscribe(plant => {
      var message  = plant.nickName ?
        `${plant.nickName} has been marked as fed` :
        `Your ${plant.commonName} has been marked as fed`
      this.snackbar.open(message, null ,{
        duration: this.snackbarDuration
      });
    }, results => {
      alert("There was a problem recording your action.\n Please try again later.");
    });
  }


  deletePlant(id: number){
    this.plantService.delete(id)
  }

  getPlantTypes(criteria: string){
    this.typeList$ = this.typeService.search(criteria)
  }

  updateFilter(value: string){}

  updatePlant(plant: Plant){
    this.plantService.save(plant);
  }

  displayDetailsCard(type: number){
    alert("care sheet goes here!")
  }

  addPlant(){
    const dialogRef = this.dialog.open(AddPlantComponent, {data: null });
    dialogRef.afterClosed().subscribe(() => this.GetUserPlants(this.loggedInUserID));

  }
}
