import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store'

import { Plant } from '../models/plant.model';
import { PlantType } from '../models/plant-type.model'
import { PlantService } from '../service/plant.service';
import { PlantTypeService } from '../service/plant-type.service';
import { PlantDetailsComponent } from '../plant-type-details/plant-type-details.component'
import { AddPlantComponent } from '../add-plant/add-plant.component'

@Component({
  selector: 'app-plant-dashboard',
  templateUrl: './plant-type-dashboard.component.html',
  styleUrls: ['./plant-type-dashboard.component.scss']
})
export class PlantTypeDashboardComponent implements OnInit {

  plantList$: Observable<PlantType[]>;
  filterValue: string = "";
  tooltipDelay: number = 250;

  constructor(
    private plantSerice: PlantService,
    private typeService: PlantTypeService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getPlantTypes(this.filterValue);
  }

  getPlantTypes(criteria: string) {
    this.plantList$ = this.typeService.search(criteria)
  }

  updateFilter(value: string) { }

  displayDetailsCard(type: string) {
    this.typeService.grab(type).subscribe(plantType => {
      const detailCard = this.dialog.open(PlantDetailsComponent, { data: plantType });

      detailCard.afterClosed().subscribe((addUserPlant: boolean) => {
        if (addUserPlant) {
          this.addUserPlant(plantType.latinName);
        }
      })
    })
  }

  addUserPlant(type: string) {
    console.log('type')
    this.typeService.grab(type).subscribe(plantType => {
      this.dialog.open(AddPlantComponent, { data: plantType });
    })
  }
}
