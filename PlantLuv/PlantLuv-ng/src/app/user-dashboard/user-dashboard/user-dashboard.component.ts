import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-plant-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {

  plantList$: Observable<Plant[]>;
  typeList$: Observable<PlantType[]>;
  filterValue: string = "";
  snackbarDuration: number = 2500;
  tooltipDelay: number = 250;
  dashboardDisplay$: string;

  constructor(
    private plantService: PlantService,
    private typeService: PlantTypeService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private store: Store<{page: string}>,
    private changeDetection: ChangeDetectorRef
  ) {
    store.pipe(select('page')).subscribe( p => {
      this.dashboardDisplay$ = p})
  }

  ngOnInit(): void {
    this.GetUserPlants(this.getLoggedInUser());
    this.getPlantTypes(this.filterValue);
  }


  getLoggedInUser(): string{
    // return localStorage.getItem('currentUser');
    return "user@me.com";
  }


  GetUserPlants(id: string){
    this.plantList$ = this.plantService.getUserPlants(id);
  }


  trackByPlantId(index, plant: Plant): number{
    return plant.plantId;
  }


  waterPlant(...ids: number[]){
    this.plantService.waterPlant(ids).subscribe((plants: Plant[]) => {
      if (plants.length > 1){
        var message = "Your plants have been marked as watered"
      } else {
        var message = plants[0].nickName ?
        `${plants[0].nickName} has been marked as watered` :
        `Your ${plants[0].commonName} has been marked as watered`
      };
      this.GetUserPlants(this.getLoggedInUser());
      this.snackbar.open(message, null ,{
        duration: this.snackbarDuration
      });
      // The page does not currently auto-update with new information.
      // GetUserPlants is being used to refresh the information until this bug can be fixed.
      this.GetUserPlants(this.getLoggedInUser());
    }, error => {
      alert("There was a problem recording your action.\n Please try again later.");
    });
  }


  fertalizePlant(...ids: number[]){
    this.plantService.fertalizePlant(ids).subscribe((plants: Plant[]) => {
      if (plants.length > 1){
        var message = "Your plants have been marked as fed"
      } else {
        var message  = plants[0].nickName ?
        `${plants[0].nickName} has been marked as fed` :
          `Your ${plants[0].commonName} has been marked as fed`
      };
      this.snackbar.open(message, null ,{
        duration: this.snackbarDuration
      });
      // The page does not currently auto-update with new information.
      // GetUserPlants is being used to refresh the information until this bug can be fixed.
      this.GetUserPlants(this.getLoggedInUser());
    }, error => {
      alert("There was a problem recording your action.\n Please try again later.");
    });
  }


  deletePlant(id: number){
    this.plantService.delete(id)
    // The page does not currently auto-update with new information.
    // GetUserPlants is being used to refresh the information until this bug can be fixed.
    this.GetUserPlants(this.getLoggedInUser());
  }


  getPlantTypes(criteria: string){
    this.typeList$ = this.typeService.search(criteria)
  }


  updateFilter(value: string){}


  updatePlant(plant: Plant){
    this.plantService.save(plant).subscribe(result => {
      // The page does not currently auto-update with new information.
      // GetUserPlants is being used to refresh the information until this bug can be fixed.
      this.GetUserPlants(this.getLoggedInUser());

    }, error => {
      alert("There was a problem recording your action.\n Please try again later.");
    });
  }


  displayDetailsCard(type: number){
    alert("care sheet goes here!")
  }


  addPlant(){
    const dialogRef = this.dialog.open(AddPlantComponent, {data: null });
    dialogRef.afterClosed().subscribe(() => {
      // The page does not currently auto-update with new information.
      // GetUserPlants is being used to refresh the information until this bug can be fixed.
      this.GetUserPlants(this.getLoggedInUser());
    });
  }

}
