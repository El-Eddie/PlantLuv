import { Component, OnInit, Inject } from '@angular/core';
import { Plant } from './plant.model'
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-delete-dialog',
  template: `
    <h2 mat-dialog-title>Delete Plant</h2>
    <mat-dialog-content class="mat-typography">
      Are you certain you wish to delete your {{plant.species}}?
  </mat-dialog-content>
  <div mat-dialog-actions align="end">
    <button mat-button [mat-dialog-close]="false">Cancel</button>
    <button mat-button [mat-dialog-close]="true" color="warn">Confirm</button>
  </div>
  `,
  styles: []
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public plant: Plant
  ) { }

  ngOnInit(): void {
  }

}
