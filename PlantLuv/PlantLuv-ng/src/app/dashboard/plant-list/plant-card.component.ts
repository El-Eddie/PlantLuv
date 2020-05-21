import { Component, OnInit, Input } from '@angular/core';
import { Plant } from '../plant.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent implements OnInit {

  @Input() plantList: Plant[];
  @Input() plant: Plant;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }


  waterPlant(id: number){
    alert("I don't do anything yet");
  }
  fertalizePlant(id: number){
  alert("I don't do anything either!");
  }
  plantDetails(id: number){
    this.router.navigate([`./plant/${id}`])
  }
}
