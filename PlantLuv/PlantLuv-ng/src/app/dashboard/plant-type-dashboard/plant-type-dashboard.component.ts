import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store'

import { Plant } from '../models/plant.model';
import { PlantType } from '../models/plant-type.model'
import { PlantService } from '../service/plant.service';
import { PlantTypeService } from '../service/plant-type.service';
import { PlantDetailsComponent } from '../plant-type-details/plant-type-details.component'
import { AddPlantComponent } from '../user-add-new-plant/user-add-new-plant.component'
import { PlantTypeAddNewComponent } from '../plant-type-add-new-plant/plant-type-add-new-plant.component';
import { HelpComponent } from '../help/help.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-plant-dashboard',
  templateUrl: './plant-type-dashboard.component.html',
  styleUrls: ['./plant-type-dashboard.component.scss']
})
export class PlantTypeDashboardComponent implements OnInit {
  plantList$: Observable<PlantType[]>;
  filterValue$ = new BehaviorSubject<string>('');
  filterValue: string = "";
  filter: Subscription;
  refinedList$ = new BehaviorSubject<Plant[]>([]);
  tooltipDelay: number = 250;

  constructor(
    private plantService: PlantService,
    private typeService: PlantTypeService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getPlantTypes(this.filterValue);
    this.filterPlants();
  }

  getPlantTypes(criteria: string) {
    this.plantList$ = this.typeService.search(criteria)
  }

  updateFilterValue(input) {
    this.filterValue$.next(input);
  }
  filterPlants(): void {
    combineLatest([this.plantList$, this.filterValue$])
      .pipe(map(([plantList, filterValue]) => {
        filterValue = filterValue;
        return plantList.filter(plant => {
          return (
            plant.commonName.toUpperCase().match(filterValue) ||
            plant.latinName.toUpperCase().match(filterValue)
          )
        })
      })).subscribe(list => {
        this.refinedList$.next;
      })
  }

  addPlantType() {
    const popupResult = this.dialog.open(PlantTypeAddNewComponent, {
      width: '450px',
      data: null,
      disableClose: true
    });
    popupResult.afterClosed().subscribe((result: PlantType) => {
      if (result) {
        this.typeService.create(result).subscribe
          (() => {
          });
      }
    });
  }
  openHelp() {
    const popupResult = this.dialog.open(HelpComponent, {
      width: '450px',
      data: null,
      disableClose: true
    });
  }

  displayDetailsCard(type: number) {
    this.typeService.grab(type).subscribe(plantType => {
      const detailCard = this.dialog.open(PlantDetailsComponent, { data: plantType });

      detailCard.afterClosed().subscribe((addUserPlant: boolean) => {
        if (addUserPlant) {
          this.addUserPlant(plantType.plantTypeID);
        }
      })
    })
  }


  addUserPlant(type: number) {
    console.log('type')
    this.typeService.grab(type).subscribe(t => {
      this.dialog.open(AddPlantComponent, { data: { plantType: t } });
    })
  }
}
