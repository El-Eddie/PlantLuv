import { Component, OnInit, Inject } from '@angular/core';
import { PlantType } from '../models/plant-type.model';
import { Plant } from '../models/plant.model';
import { NewUserPlant } from '../models/new-plant.model';
import { PlantTypeService } from '../service/plant-type.service';
import { PlantService } from '../service/plant.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, PatternValidator, ValidatorFn, NgModel, ValidationErrors } from '@angular/forms';
import { Observable, Subscription, from, of } from 'rxjs';
import {map, startWith, filter} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'
import { nextTick } from 'process';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss']
})

export class AddPlantComponent implements OnInit {

  activeUser: string;
  formGroup: FormGroup;
  typeList$: Observable<PlantType[]>;
  typeArray: PlantType[];
  typeList: string[] = [];
  filteredTypeList$: Observable<string[]>;
  selectedTypeID: number;
  snackbarDuration: number = 2500;
  defaultImage: string;
  placeholderImage: string = "/assets/img/plants/plant-image-placeholder.png"
  imageName: string = "";
  otherOption: string = "other/unlisted"
  acceptedFileTypes = [
    'image/jpeg',
    'image/jpg',
    'image/bmp',
    'image/png'
  ];


  constructor(
    private plantService: PlantService,
    private typeService: PlantTypeService,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<AddPlantComponent>,
    public builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public type: PlantType | null
  ) {
    var selectedPlant = (this.type && this.type.commonName) ? this.type.commonName : '';
    this.formGroup = this.builder.group({
      plantType: [
        selectedPlant,
        Validators.required, this.plantTypeValidator.bind(this)
      ],
      nickName: ['',],
      birthday: [''],
      lastWatered: [''],
      lastFertalized: [''],
      wherePurchased: [''],
      receiveNotifications: ['']
    })
  }


  ngOnInit(): void {
    this.typeList$ = this.typeService.search("")

    this.typeList$.subscribe(() =>{
      this.filteredTypeList$ = this.getOptions();
    })

    this.filteredTypeList$ = this.formGroup.get("plantType").valueChanges.pipe(
      startWith(''),
      map(val => this.filterValue(val))
    )

    this.defaultImage = this.placeholderImage;
    this.activeUser = "user@me.com" // change logic to detect actual logged in user
  }


  plantTypeValidator(field: AbstractControl): ValidationErrors | null {
    const input = field.value.toUpperCase()
    var regexInput = "^"+input+"$";
    var isValid = false;

    if (input == this.otherOption.toUpperCase()) {
      this.selectedTypeID = 0;
      isValid = true;
     }

    this.typeList$.forEach(_array => {
      _array.forEach(_type => {
        if (_type.commonName.toUpperCase().match(regexInput)) {
          isValid = true;
          this.selectedTypeID = _type.typeID;
        }
      })
    })
    return isValid ? of(null) : of({'invalidEntry': true});
  }


    filterValue(val: string): string[] {
      const filterValue = val.toLowerCase();
      return this.typeList.filter(t => t.toLowerCase().includes(filterValue));
    }


  getOptions(): Observable<string[]>{
    this.typeList$.forEach(_array => {
      _array.forEach(_type => { // this works, but can/should we use map?
        this.typeList.push(_type.commonName)
      });
    })
    return of(this.typeList);
  }


  cancel(){
    this.dialogRef.close()
  }


  save(){
    if(!this.formGroup.valid){ return; }

    const today = new Date();
    var plant: NewUserPlant = {...this.formGroup.value};
    plant.ownerID = this.activeUser
    plant.thumbnailURL = this.defaultImage
    plant.typeID = this.selectedTypeID;

    plant.birthday = plant.birthday ? plant.birthday : today;
    plant.lastFertalized = plant.lastFertalized ? plant.birthday : today;
    plant.lastWatered = plant.lastWatered ? plant.birthday : today;


    this.plantService.create(plant).subscribe(results => {
      if(results){
        var message ="Plant added successfully"
        this.snackbar.open(message, null ,{
          duration: this.snackbarDuration
        });
      };
      this.dialogRef.close();
    });
  }


  changeDefaultPicure(event: any){
    const input: string = "^"+event.target.value.toUpperCase()+"$";
    var newPic: string = null

    this.typeList$.forEach(_array => {
      _array.forEach(_type => {
        if (_type.commonName.toUpperCase().match(input)) {
          newPic = _type.thumbnailURL
        }
      })
    })

    if (newPic) {
      this.defaultImage = newPic;
    } else {
      this.defaultImage = this.placeholderImage;
    }
  }


  clearImage(){
    this.imageName = null;
  }


  fileChosen(event: any){
    if (event.target.files && event.target.files[0])
    {
      const file = event.target.files[0];
      console.log(file)
      if(!this.acceptedFileTypes.includes(file.type)){
        this.snackbar.open('Invalid file type','ok',{duration: this.snackbarDuration})
        return;
      }
      this.imageName = file.name
      const formData = new FormData();
      formData.append('model', file)
    }
  }

}
