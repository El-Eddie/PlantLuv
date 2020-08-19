import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { PlantType } from '../models/plant-type.model'
import { ImageDialogComponent } from '../image-dialog/image-dialog.component'
import { PhotoData } from '../models/photo-data.model'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-type-details.component.html',
  styleUrls: ['./plant-type-details.component.scss']
})

export class PlantDetailsComponent implements OnInit {
  public toxisity: string[] = [];

  tooltipDelay: number = 250

  constructor(
    public dialogRef: MatDialogRef<PlantDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public type: PlantType,
  ) { }

  ngOnInit(): void { this.gettoxisity() }

  addPlant() {
    this.dialogRef.close({ addUserPlant: true });
  }
  closePlant() {
    this.dialogRef.close()
  }

  gettoxisity() {

    if (this.type.toxicToCats) { this.toxisity.push("Cats") }

    if (this.type.toxicToDogs) { this.toxisity.push("Dogs") }

    if (this.type.toxicToSmallAnimals) { this.toxisity.push("Small-Animals") }

    if (this.toxisity.length == 0) this.toxisity.push("Pet-Safe")

  }
}
