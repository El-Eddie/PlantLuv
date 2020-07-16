import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plant } from '../models/plant.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../pop-up/delete-dialog.component';
import { PlantService } from '../service/plant.service'
import { RenameDialogComponent } from '../pop-up/rename-dialog.component';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent implements OnInit {

  @Input() plant: Plant;
  @Output() waterPlantEvent: EventEmitter<number> = new EventEmitter();
  @Output() fertalizePlantEvent: EventEmitter<number> = new EventEmitter();
  @Output() deletePlantEvent: EventEmitter<number> = new EventEmitter();
  @Output() viewCareSheetEvent: EventEmitter<number> = new EventEmitter();
  @Output() updatePlant: EventEmitter<Plant> = new EventEmitter();

  constructor(
    private service: PlantService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  waterPlant(id: number){ this.waterPlantEvent.emit(id); }


  fertalizePlant(id: number){ this.fertalizePlantEvent.emit(id); }


  triggerSlideshow(id: number){ alert("trigger slideshow for plant number "+id); }


  toggleFavorite(){
    var changedPlant = {...this.plant};
    changedPlant.isFavorite = !this.plant.isFavorite
    this.updatePlant.emit(changedPlant);
  }


  toggleAlerts(){
    var changedPlant = {...this.plant};
    changedPlant.receiveNotifications = !this.plant.receiveNotifications;
    this.updatePlant.emit(changedPlant);
  }


  openCareSheet(){ this.viewCareSheetEvent.emit(this.plant.typeId); }


  confirmDelete(){
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: this.plant });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("delete confirmation is true")
        this.deletePlantEvent.emit(this.plant.plantId);
      } else {
        console.log("delete confirmation is false")
      }
    })
  }


  renamePlant(){
    var changedPlant = {...this.plant};
    const dialogRef = this.dialog.open(RenameDialogComponent, { data: this.plant });
    dialogRef.afterClosed().subscribe(result => {
      changedPlant.nickName = result.data;
      this.updatePlant.emit(changedPlant);
    });
   }

}
