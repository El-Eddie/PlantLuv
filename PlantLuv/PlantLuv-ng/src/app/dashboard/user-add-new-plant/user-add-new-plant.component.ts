import { Component, OnInit, Inject } from '@angular/core';
import { PlantType } from '../models/plant-type.model';
import { Plant } from '../models/plant.model';
import { NewUserPlant } from '../models/new-plant.model';
import { PlantTypeService } from '../service/plant-type.service';
import { PlantService } from '../service/plant.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, PatternValidator, ValidatorFn, NgModel, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, Subscription, from, of, BehaviorSubject } from 'rxjs';
import { map, startWith, filter, debounceTime } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'
import { nextTick, config } from 'process';
import { async } from 'rxjs/internal/scheduler/async';
import { FileService } from '../service/file.service';
import { FileMetadata } from '../models/file.model';

@Component({
  selector: 'app-add-plant',
  templateUrl: './user-add-new-plant.component.html',
  styleUrls: ['./user-add-new-plant.component.scss']
})

export class AddPlantComponent implements OnInit {

  activeUser: string;
  formGroup: FormGroup;
  // typeList$: Observable<PlantType[]>;
  typeList$ = new BehaviorSubject<PlantType[]>([]);
  typeArray: PlantType[];
  typeList: string[] = [];
  filteredTypeList$: Observable<string[]>;
  selectedtypeId: number;
  snackbarDuration: number = 2500;
  defaultImage: string;
  placeholderImage: string = "/assets/img/plants/plant-image-placeholder.png";
  otherOption: string = "other/unlisted";
  acceptedFileTypes = [
    'image/jpeg',
    'image/jpg',
    'image/bmp',
    'image/png'
  ];
  uploadedFileUrl: string = null;
  uploadedFileId: string = null;
  uploadedFileName: string = null;
  title: string;

  constructor(
    private plantService: PlantService,
    private typeService: PlantTypeService,
    private fileService: FileService,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<AddPlantComponent>,
    public builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:  {plant: null | Plant, plantType: null | PlantType}
  ) {
    this.formGroup = this.builder.group({
      commonName: [
        '',
        [Validators.required, this.plantTypeValidator.bind(this)]
      ],
      nickName: [''],
      birthday: [''],
      lastWatered: [''],
      lastFertalized: [''],
      wherePurchased: [''],
      receiveNotifications: ['']
    });
     if (this.data?.plant){
       this.formGroup.patchValue(this.data.plant);
    };
  }


  ngOnInit(): void {
    this.typeService.search("").subscribe((value: PlantType[]) => {
      this.typeList$.next(value);
      this.filteredTypeList$ = this.getOptions();
      this.filteredTypeList$ = this.formGroup.get("commonName").valueChanges.pipe(
        startWith(''),
        map(val => this.filterValue(val))
      )
    });

    this.defaultImage = this.getPlaceholderImage();
    this.activeUser = this.getLoggedInUser();

    this.title = (this.data?.plant)
      ? "Editing Your " + this.data.plant.commonName
      : "Add New Plant"
  }


  getLoggedInUser(): string {
    let currentUser = localStorage.getItem('currentUser');
    return JSON.parse(currentUser).id;
  }


  getPlaceholderImage(): string{
    if (this.data?.plant) {
      return this.fileService.thumbnailUrl(this.data.plant.primaryImageID);
    } else if (this.data?.plantType) {
      return this.fileService.thumbnailUrl(this.data.plantType.stockImageID);
    } else {
      return this.placeholderImage;
    }
  }

  plantTypeValidator(field: AbstractControl): ValidationErrors | null {
    if (field.pristine) {return null}

    const input = field.value.toUpperCase()
    var regexInput = "^" + input + "$";
    var isValid= false;

    if (input == this.otherOption.toUpperCase()) {
      this.selectedtypeId = 0;
      return null;
    }

    this.typeList$.getValue().forEach(type => {
      if (type.commonName.toUpperCase().match(regexInput)) {
        isValid = true;
        this.selectedtypeId = type.plantTypeID;
      }
    })

    return isValid ? null : { 'invalidEntry': true };
  }


  filterValue(val: string): string[] {
    const filterValue = val.toLowerCase();
    return this.typeList.filter(t => t.toLowerCase().includes(filterValue));
  }


  getOptions(): Observable<string[]> {
    this.typeList = this.typeList$.getValue().map(t => t.commonName);
    return of(this.typeList);
    // }))
  }


  cancel() {
    this.dialogRef.close()
  }


  save() {
    if (!this.formGroup.valid) { return; }

    const today = new Date();
    var plant: NewUserPlant = {...this.formGroup.value};
    plant.ownerId = this.activeUser;
    plant.PrimaryImageID = this.uploadedFileId

    plant.PlantTypeID = this.selectedtypeId;

    if (!plant.receiveNotifications) { plant.receiveNotifications = false }

    plant.birthday = plant.birthday ? plant.birthday : today;
    plant.lastFertalized = plant.lastFertalized ? plant.lastFertalized : today;
    plant.lastWatered = plant.lastWatered ? plant.lastWatered : today;

    if (this.data?.plant){
      var updated: Plant = {...this.data.plant, ...plant}

      this.plantService.save(updated).subscribe(results => {
          var message = "Plant saved successfully"
          this.snackbar.open(message, null, {
            duration: this.snackbarDuration
          });
          this.dialogRef.close(results);
        }, results => {
          alert("There was an error saving your plant.\n Please check the information and try again.");
        });
    } else {
      this.plantService.create(plant).subscribe(results => {
        var message = "Plant added successfully"
        this.snackbar.open(message, null, {
          duration: this.snackbarDuration
        });
        this.dialogRef.close(results);
      }, results => {
        alert("There was an error saving your new plant.\n Please check the information and try again.");
      });
    }
  }


  changeDefaultPicure(event: any) {
    const input: string = "^" + event.target.value.toUpperCase() + "$";

    this.typeList$.getValue().forEach(type => {
      if (type.commonName.toUpperCase().match(input)) {
        this.defaultImage = this.fileService.thumbnailUrl(type.stockImageID);
      }
    })
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
      formData.append('model', file) //needs to match up with c#

      this.fileService.upload(formData).subscribe((result: FileMetadata) => {
        this.uploadedFileId = result.fileId;
        this.uploadedFileName = file.name;
        this.uploadedFileUrl = this.fileService.thumbnailUrl(result.fileId);
      }, (err) => {
        this.snackbar.open("Image upload failed. Please try again later.", '', { duration: this.snackbarDuration })
      })
    }
  }

}
