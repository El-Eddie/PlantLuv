import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlantType } from '../models/plant-type.model';

@Component({
  selector: 'app-plant-type-card',
  templateUrl: './plant-type-card.component.html',
  styleUrls: ['./plant-type-card.component.scss'],
})

export class PlantCardComponent implements OnInit {

  @Input() planttype: PlantType;
  @Output() displayDetailsEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  typeDetails() {
    this.displayDetailsEvent.emit(this.planttype.latinName)
  }


}
