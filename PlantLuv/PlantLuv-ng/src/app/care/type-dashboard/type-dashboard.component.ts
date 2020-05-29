import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { TypeDetailsComponent } from '../type-details/type-details.component'
import { PlantTypeService } from '../plant-type.service';
import { PlantType } from '../plant-type.model';

@Component({
  selector: 'app-care-sheets',
  templateUrl: './type-dashboard.component.html',
  styleUrls: ['./type-dashboard.component.scss']
})
export class TypeDashboardComponent implements OnInit {

  typeList$: Observable<PlantType[]>;
  filterValue: string;


  constructor(
    private typeService: PlantTypeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.filterValue = ""
    this.getPlantTypes(this.filterValue)
  }

  getPlantTypes(criteria: string){
    this.typeList$ = this.typeService.search(criteria)
  }

  displayDetailsCard(type: PlantType){
    const dialogRef = this.dialog.open(TypeDetailsComponent, { data: type });
    dialogRef.afterClosed().subscribe(result => {console.log("dialog closed")})

  }
}
