import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PlantTypeService } from '../plant-type.service';
import { PlantType } from '../plant-type.model';

@Component({
  selector: 'app-care-sheets',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.scss']
})
export class TypeListComponent implements OnInit {

  typeList$: Observable<PlantType[]>;
  filterValue: string;

  constructor(
    private typeService: PlantTypeService
  ) { }

  ngOnInit(): void {
    this.filterValue = ""
    this.getPlantTypes(this.filterValue)
  }

  getPlantTypes(criteria: string){
    this.typeList$ = this.typeService.search(criteria)

  }
}
