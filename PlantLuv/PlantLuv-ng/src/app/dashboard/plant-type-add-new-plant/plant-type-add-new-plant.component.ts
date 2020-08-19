import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PlantType } from '../models/plant-type.model';
import { of, Observable } from 'rxjs';
import { FileService } from '../service/file.service';
import { FileMetadata } from '../models/file.model';
import { MatSnackBar } from '@angular/material/snack-bar'


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
  defaultImage: string;
  snackbarDuration: number = 2500;

  filteredTypeList$: Observable<string[]>;
  acceptedFileTypes = [
    'image/jpeg',
    'image/jpg',
    'image/bmp',
    'image/png'
  ];
  uploadedFileUrl: string = null;
  uploadedFileId: string = null;
  uploadedFileName: string = null;
  otherOption: string = "other/unlisted"

  constructor(
    public dialogRef: MatDialogRef<PlantTypeAddNewComponent>,
    public builder: FormBuilder,
    private fileService: FileService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public type: PlantType | null
  ) {

    this.newPlantType = this.builder.group({
      stockImageID: [''],
      latinName: [''],
      commonName: [''],
      description: [''],
      difficulty: [''],
      humidityLowLevel: [''],
      humidityHighLevel: [''],
      lightLevel: [''],
      lightTime: [''],
      soilPh: [''],
      soilType: [''],
      fertilizerFrequency: [''],
      fertalizerType: [''],
      wateringFrequency: [''],
      waterType: [''],
      toxicToCats: [''],
      toxicToDogs: [''],
      toxicToSmallAnimals: [''],
      scienceKingdom: [''],
      scienceClade1: [''],
      scienceClade2: [''],
      scienceClade3: [''],
      scienceOrder: [''],
      scienceFamily: [''],
      scienceSubfamily: [''],
      scienceGenus: [''],
    });
    if (this.type) {
      this.newPlantType.patchValue(this.type);
    }
  }

  clearImage() {
    this.uploadedFileUrl = null;
    this.uploadedFileName = null;
    this.uploadedFileId = null;
  }

  fileChosen(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!this.acceptedFileTypes.includes(file.type)) {
        this.snackbar.open('Invalid file type', '', { duration: this.snackbarDuration })
        return;
      }
      const formData = new FormData();
      formData.append('model', file)

      this.fileService.upload(formData).subscribe((result: FileMetadata) => {
        this.uploadedFileId = result.fileId;
        this.uploadedFileName = file.name;
        this.uploadedFileUrl = this.fileService.stockImageID(result.fileId, null);
      }, (err) => {
        this.snackbar.open("Image upload failed. Please try again later.", '', { duration: this.snackbarDuration })
      })
    }
  }

  ngOnInit(): void {
  }
  cancel() {
    this.dialogRef.close()
  }
  save() {
    if (!this.newPlantType.valid) {
      return;
    }

    var plant = { ...this.type, ...this.newPlantType.value };

    this.dialogRef.close(plant)
  }
}
