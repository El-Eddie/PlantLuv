import { Component, OnInit, Input } from '@angular/core';
import { Plant } from '../plant.model';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit {

  @Input() plantList: Plant[];

  constructor() { }

  ngOnInit(): void {

  }


  waterPlant(id: number){
    alert("I don't do anything yet");
  }
  fertalizePlant(id: number){
  alert("I don't do anything either!");
  }
}
