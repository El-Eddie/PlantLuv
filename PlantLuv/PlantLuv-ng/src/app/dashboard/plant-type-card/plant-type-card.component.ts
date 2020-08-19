import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlantType } from '../models/plant-type.model';
import { MatDialog } from '@angular/material/dialog';
import { PlantTypeAddNewComponent } from '../plant-type-add-new-plant/plant-type-add-new-plant.component';
import { PlantTypeService } from '../service/plant-type.service';

@Component({
  selector: 'app-plant-type-card',
  templateUrl: './plant-type-card.component.html',
  styleUrls: ['./plant-type-card.component.scss'],
})

export class PlantCardComponent implements OnInit {

  @Input() planttype: PlantType;
  @Output() displayDetailsEvent: EventEmitter<number> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private svc: PlantTypeService) { }

  ngOnInit() {
  }

  editPlantType() {
    const popupResult = this.dialog.open(PlantTypeAddNewComponent, {
      width: '450px',
      data: this.planttype,
      disableClose: true
    });
    popupResult.afterClosed().subscribe(result => {
      if (result) {
        this.svc.update(result).subscribe
          (result => {
            this.planttype = result;
          });
      }
    });
  }

  typeDetails() {
    this.displayDetailsEvent.emit(this.planttype.plantTypeID)
  }


}
