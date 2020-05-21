import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantService } from '../plant.service';
import { Plant } from '../plant.model';


@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss']
})
export class PlantDetailsComponent implements OnInit {

  public plant: Plant;
  private previousPage: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PlantService
  ) { }

  ngOnInit(): void {
    this.service.grab(this.route.snapshot.params.id)
      .subscribe(plant => this.plant = plant);


  }

}
