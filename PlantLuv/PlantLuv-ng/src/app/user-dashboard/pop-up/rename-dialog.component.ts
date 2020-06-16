import { Component, OnInit, Inject } from '@angular/core';
import { Plant } from '../models/plant.model'
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-rename-dialog',
  template: `
<h2 mat-dialog-title>Rename Plant</h2>
    <mat-dialog-content class="mat-typography">
      <p>What woud you like to call your <br/>
      {{plant.commonName}} aquired on {{plant.birthday | date:'M/d'}}?</p>
      <form [formGroup]="form" noValidate>
        <mat-form-field>
          <input matInput [placeholder]="plant.nickName" formControlName="nickName" name="nickName" />
        </mat-form-field>
      </form>
    </mat-dialog-content>
  <div mat-dialog-actions align="end">
    <button mat-raised-button (click)="save()">Ok</button>
    <button mat-raised-button (click)="close()">Cancel</button>
  </div>
  `,
  styles: []
})
export class RenameDialogComponent implements OnInit {

  form: FormGroup;
  constructor(
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<RenameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public plant: Plant
  ) {
    this.form = this.builder.group({
      nickName:[''],
    })
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close({data: null})
  }

  save(){
    var newName = this.form.value['nickName'];
    if(newName.length == 0){
      newName = this.plant.commonName
    }
    this.dialogRef.close({data: newName})
  }
}
