import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { PlantType } from '../models/plant-type.model'
import { ImageDialogComponent } from '../image-dialog/image-dialog.component'
import { PhotoData } from '../models/photo-data.model'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss']
})

export class PlantDetailsComponent implements OnInit {

  tooltipDelay: number = 250

  constructor(
    public dialogRef: MatDialogRef<PlantDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public type: PlantType,
  ) { }

  ngOnInit(): void { }

  addPlant() {
    this.dialogRef.close({ addUserPlant: true });
  }
  closePlant() {
    this.dialogRef.close()
  }
}
