import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlantType } from '../models/plant-type.model';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss'],
})

export class PlantCardComponent implements OnInit {

  @Input() type: PlantType;
  @Output() displayDetailsEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  typeDetails() {
    this.displayDetailsEvent.emit(this.type.latinName)
  }


}
