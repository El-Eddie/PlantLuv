import { Component, OnInit, Inject } from '@angular/core';
import { PlantType } from '../models/plant-type.model';
import { Plant } from '../models/plant.model';
import { PlantTypeService } from '../service/plant-type.service';
import { PlantService } from '../service/plant.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription, from, of } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'
import { nextTick } from 'process';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss']
})

export class AddPlantComponent implements OnInit {

  formGroup: FormGroup;
  typeList$: Observable<PlantType[]>;
  typeList: string[] = [];
  filteredTypeList$: Observable<string[]>
  showNickname: boolean = false;
  showWatered: boolean = false;
  showFertalized: boolean = false;
  snackbarDuration: number = 3000;
  imageName: string = "";
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
      plantType: [selectedPlant],
      nickName: [''],
      birthday: [''],
      lastWatered: [''],
      lastFertalized: [''],
      photo: [''],
      receiveAlerts: ['']
    })
  }

  ngOnInit(): void {
    this.typeList$ = this.typeService.search("")

    this.typeList$.subscribe(() =>{
      this.filteredTypeList$ = this.getOptions();
    })

    // this.filteredTypeList$ = this.formGroup.get("plantType").valueChanges.pipe(
    //   startWith(''),
    //   map(val => this.filterValue(val))
    // )

  }

  getOptions(): Observable<string[]>{
    // this.typeList$.subscribe(_array => {
    this.typeList$.forEach(_array => {
      _array.forEach(_type => { // this works, but can/should we use map?
        this.typeList.push(_type.commonName)
      });
    })
    return of(this.typeList);
  }

  filterValue(val: string): string[] {
    console.log(`value is ${val}`)
    return this.typeList.filter(type => {
      type.toUpperCase().includes(val.toUpperCase())
    })
  }

  cancel(){
    this.dialogRef.close()
  }

  save(){
    // if(this.formGroup.valid){ return; }

    // var newPlant: Plant = { ...this.formGroup.value};
    // console.log(newPlant);
  }

  filterTypes(val: any){
    // console.log(val, typeof(val))
  }


  fileChosen(event: any){
    // if (event.target.files && event.target.files[0])
    // {
    //   const file = event.target.files[0];

    //   if(!this.acceptedFileTypes.includes(file.type)){
    //     this.snackbar.open('Invalid file type','ok',{duration: this.snackbarDuration})
    //     return;
    //   }
    //   this.imageName = file.name
      // const formData = new FormData();
      // formData.append('model', file)
    // }
  }
}
