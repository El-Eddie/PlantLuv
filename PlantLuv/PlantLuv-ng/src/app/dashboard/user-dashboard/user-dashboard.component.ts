import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store'

import { Plant } from '../models/plant.model';
import { PlantType } from '../models/plant-type.model'
import { PlantService } from '../service/plant.service';
import { PlantTypeService } from '../service/plant-type.service';
import { PlantDetailsComponent } from '../plant-type-details/plant-type-details.component'
import { AddPlantComponent } from '../add-plant/add-plant.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-plant-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {

  plantList$ = new BehaviorSubject<Plant[]>([]);
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
    private store: Store<{ page: string }>,
    private changeDetection: ChangeDetectorRef
  ) {
    store.pipe(select('page')).subscribe(p => {
      this.dashboardDisplay$ = p
    })
  }

  ngOnInit(): void {
    this.GetUserPlants(this.getLoggedInUser());
    this.getPlantTypes(this.filterValue);
  }


  getLoggedInUser(): string {
    // return localStorage.getItem('currentUser');
    return "user@me.com";
  }


  GetUserPlants(id: string) {
    // this.plantList$ = this.plantService.getUserPlants(id);
    this.plantService.getUserPlants(id).subscribe(value => {
      this.plantList$.next(value);
    });

  }


  trackByPlantId(_, plant: Plant): number {
    return plant.plantId;
  }


  waterPlant(...ids: number[]) {
    this.plantService.waterPlant(ids).subscribe((plants: Plant[]) => {
      if (plants.length > 1) {
        var message = "Your plants have been marked as watered"
      } else {
        var message = plants[0].nickName ?
          `${plants[0].nickName} has been marked as watered` :
          `Your ${plants[0].commonName} has been marked as watered`
      };
      this.snackbar.open(message, null, {
        duration: this.snackbarDuration
      });
    }, error => {
      alert("There was a problem recording your action.\n Please try again later.");
    });
  }


  fertalizePlant(...ids: number[]) {
    this.plantService.fertalizePlant(ids).subscribe((plants: Plant[]) => {
      if (plants.length > 1) {
        var message = "Your plants have been marked as fed"
      } else {
        var message = plants[0].nickName ?
          `${plants[0].nickName} has been marked as fed` :
          `Your ${plants[0].commonName} has been marked as fed`
      };
      this.snackbar.open(message, null, {
        duration: this.snackbarDuration
      });
    }, error => {
      alert("There was a problem recording your action.\n Please try again later.");
    });
  }


  deletePlant(id: number) {
    this.plantService.delete(id);
  }


  getPlantTypes(criteria: string) {
    this.typeList$ = this.typeService.search(criteria)
  }


  updateFilter(value: string) { }


  updatePlant(plant: Plant) {
    this.plantService.save(plant).subscribe(() => {
    }, error => {
      alert("There was a problem recording your action.\n Please try again later.");
    });
  }


  displayDetailsCard(type: number) {
    alert("care sheet goes here!")
  }


  addPlant() {
    this.dialog.open(AddPlantComponent, { data: null });
  }

}
