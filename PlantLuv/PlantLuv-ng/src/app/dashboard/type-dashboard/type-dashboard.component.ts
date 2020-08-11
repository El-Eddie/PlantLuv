import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store'

import { Plant } from '../models/plant.model';
import { PlantType } from '../models/plant-type.model'
import { PlantService } from '../service/plant.service';
import { PlantTypeService } from '../service/plant-type.service';
import { TypeDetailsComponent } from '../type-details/type-details.component'
import { AddPlantComponent } from '../add-plant/add-plant.component'

@Component({
  selector: 'app-type-dashboard',
  templateUrl: './type-dashboard.component.html',
  styleUrls: ['./type-dashboard.component.scss']
})
export class TypeDashboardComponent implements OnInit {

  typeList$: Observable<PlantType[]>;
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

  getPlantTypes(criteria: string){
    this.typeList$ = this.typeService.search(criteria)
  }

  updateFilter(value: string){}

  displayDetailsCard(type: string){
    this.typeService.grab(type).subscribe(plantType => {
      const detailCard = this.dialog.open(TypeDetailsComponent, { data: plantType });

      detailCard.afterClosed().subscribe((addUserPlant: boolean) => {
        if (addUserPlant){
          this.addUserPlant(plantType.lattinName);
        }
      })
    })
  }

  addUserPlant(type: string){
    console.log('type')
    this.typeService.grab(type).subscribe(plantType => {
      this.dialog.open(AddPlantComponent, { data: plantType });
    })
  }
}
