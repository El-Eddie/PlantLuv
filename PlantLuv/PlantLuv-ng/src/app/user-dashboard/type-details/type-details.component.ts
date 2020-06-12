import { Component, OnInit, Inject } from '@angular/core';
import { PlantType } from '../models/plant-type.model'
import { ImageDialogComponent } from '../image-dialog/image-dialog.component'
import { PhotoData } from '../models/photo-data.model'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-type-details',
  templateUrl: './type-details.component.html',
  styleUrls: ['./type-details.component.scss']
})

export class TypeDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TypeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public type: PlantType
  ) { }

  ngOnInit(): void { }
}
