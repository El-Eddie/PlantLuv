import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-plant-type-add-new',
  templateUrl: './plant-type-add-new-plant.component.html',
  styleUrls: ['./plant-type-add-new-plant.component.scss']
})
export class PlantTypeAddNewComponent implements OnInit {
  newPlantType: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PlantTypeAddNewComponent>
  ) { }

  ngOnInit(): void {
  }
  cancel() {
    this.dialogRef.close()
  }
  save() {
    this.dialogRef.close()
  }
}
