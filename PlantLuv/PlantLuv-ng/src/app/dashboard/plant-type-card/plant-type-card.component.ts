import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { PlantType } from '../models/plant-type.model';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlantTypeAddNewComponent } from '../plant-type-add-new-plant/plant-type-add-new-plant.component';
import { PlantTypeService } from '../service/plant-type.service';
import { FileService } from '../service/file.service';


@Component({
  selector: 'app-plant-type-card',
  templateUrl: './plant-type-card.component.html',
  styleUrls: ['./plant-type-card.component.scss'],
})

export class PlantCardComponent implements OnInit {
  public toxisity: string[] = [];

  @Input() planttype: PlantType;
  @Output() displayDetailsEvent: EventEmitter<number> = new EventEmitter();
  @Output() addUserPlantEvent: EventEmitter<number> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private svc: PlantTypeService,
    public fileService: FileService
  ) { }

  ngOnInit(): void {
    this.gettoxisity()
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

  addUserPlant() {
    this.addUserPlantEvent.emit(this.planttype.plantTypeID)
  }

  typeDetails() {
    this.displayDetailsEvent.emit(this.planttype.plantTypeID)
  }
  gettoxisity() {

    if (this.planttype.toxicToCats) { this.toxisity.push("Cats") }

    if (this.planttype.toxicToDogs) { this.toxisity.push("Dogs") }

    if (this.planttype.toxicToSmallAnimals) { this.toxisity.push("Small-Animals") }

    if (this.toxisity.length === 0) this.toxisity.push("Pet-Safe")

  }
}
