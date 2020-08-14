import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlantType } from '../models/plant-type.model';
import { of, Observable } from 'rxjs';


@Component({
  selector: 'app-plant-type-add-new',
  templateUrl: './plant-type-add-new-plant.component.html',
  styleUrls: ['./plant-type-add-new-plant.component.scss']
})
export class PlantTypeAddNewComponent implements OnInit {
  newPlantType: FormGroup;
  selectedtypeId: number;
  typeList: string[] = [];
  typeList$: Observable<PlantType[]>;
  filteredTypeList$: Observable<string[]>;
  otherOption: string = "other/unlisted"

  constructor(
    public dialogRef: MatDialogRef<PlantTypeAddNewComponent>,
    public builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public type: PlantType | null
  ) {
    var selectedPlant = (this.type && this.type.commonName) ? this.type.commonName : '';
    this.newPlantType = this.builder.group({
      latinName: [''],
      commonName: [''],
      description: [''],
      difficultyLeve: [''],
      toxicTo: [''],
      humidityLow: [''],
      humidityHigh: [''],
      lightLevel: [''],
      lightTime: [''],
      soilPh: [''],
      soilType: [''],
      fertalizerFrequency: [''],
      fertalizerType: [''],
      wateringFrequency: [''],
      wateringType: [''],
      kingdom: [''],
      clade1: [''],
      clade2: [''],
      clade3: [''],
      order: [''],
      family: [''],
      subFamily: [''],
      genus: [''],
    })
  }


  ngOnInit(): void {
  }
  cancel() {
    this.dialogRef.close()
  }
  save() {
    this.dialogRef.close()
  }
}
