import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhotoData } from '../models/photo-data.model';

@Component({
  selector: 'image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {

  private activeImageIndex: number = -1 // initalized to -1 so the changeImage function sets it to 0 when called from onInit
  public activeImage: PhotoData;
  public imgWidth: number;
  public imgHeight: number;

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public imgArray: PhotoData[]
  ) {
  }


  ngOnInit(): void {
    this.changeImage(true)
    this.dialogRef.afterOpened().subscribe(() => this.changeSize())
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  changeImage(dir: boolean){
    // true advances the index by 1. false reverts by 1
    this.activeImageIndex += dir ? 1 : -1

    if (this.activeImageIndex < 0
      || this.activeImageIndex >= this.imgArray.length){
      this.activeImageIndex = 0
    }

    this.activeImage = this.imgArray[this.activeImageIndex]
    this.changeSize()
  }

  changeSize(){
    const margin = 60
    let arrowContainer = document.getElementById('slideshow-arrow-container');
    this.imgWidth = this.activeImage.imgWidth
    this.imgHeight = this.activeImage.imgHeight
    this.dialogRef.updateSize(
      ( this.activeImage.imgWidth + margin ).toString().concat("px"),
      (  + margin ).toString().concat("px")
    );

    arrowContainer.style
  }
}


