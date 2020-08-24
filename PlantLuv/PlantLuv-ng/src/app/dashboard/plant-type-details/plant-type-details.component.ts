import { Component, OnInit, Inject } from '@angular/core';
import { PlantType } from '../models/plant-type.model'
import { FileService } from '../service/file.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileService } from '../service/file.service';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-type-details.component.html',
  styleUrls: ['./plant-type-details.component.scss']
})

export class PlantDetailsComponent implements OnInit {
  public toxisity: string[] = [];

  tooltipDelay: number = 250
  imageURL: string;

  constructor(
    public dialogRef: MatDialogRef<PlantDetailsComponent>,
    public fileService: FileService,
    @Inject(MAT_DIALOG_DATA) public type: PlantType
  ) { }

  ngOnInit(): void {
    this.gettoxisity()
    this.imageURL = this.fileService.largeUrl(this.type.stockImageID)
  }

  addPlant() {
    this.dialogRef.close({ addUserPlant: true });
  }
  closePlant() {
    this.dialogRef.close()
  }

  gettoxisity() {

    if (this.type.toxicToCats) { this.toxisity.push("Cats") }

    if (this.type.toxicToDogs) { this.toxisity.push("Dogs") }

    if (this.type.toxicToSmallAnimals) { this.toxisity.push("Small-Animals") }

    if (this.toxisity.length == 0) this.toxisity.push("Pet-Safe")

  }
}
