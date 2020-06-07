import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plant } from '../plant.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog.component';
import { PlantService } from '../plant.service'
@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent implements OnInit {

  @Input() plant: Plant;
  @Output() waterPlantEvent: EventEmitter<number> = new EventEmitter();
  @Output() fertalizePlantEvent: EventEmitter<number> = new EventEmitter();
  @Output() toggleFavoriteEvent: EventEmitter<number> = new EventEmitter();
  @Output() toggleAlertsEvent: EventEmitter<number> = new EventEmitter();
  @Output() deletePlantEvent: EventEmitter<number> = new EventEmitter();

  constructor(
    private service: PlantService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  waterPlant(id: number){
    this.waterPlantEvent.emit(id);
  }

  fertalizePlant(id: number){
    this.fertalizePlantEvent.emit(id);
  }

  triggerSlideshow(id: number){
    alert("trigger slideshow for plant number "+id);
  }

  toggleFavorite(id: number){
    this.toggleFavoriteEvent.emit(id)
  }

  toggleAlerts(id: number){
    this.toggleAlertsEvent.emit(id)
  }

  confirmDelete(plant: Plant){
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: plant });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("delete confirmation is true")
        this.deletePlantEvent.emit(plant.plantID);
      } else {
        console.log("delete confirmation is false")
      }

    })

  }


  openCareSheet(type: string){
    alert("open the care sheet for "+type+" somehow...")
  }
}
