import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlantType } from '../models/plant-type.model';

@Component({
  selector: 'app-type-card',
  templateUrl: './type-list-card.component.html',
  styleUrls: ['./type-list-card.component.scss']
})

export class TypeListCardComponent implements OnInit {

  @Input() type: PlantType;
  @Output() displayDetailsEvent: EventEmitter<string> = new EventEmitter();

  constructor( ){}

  ngOnInit(){
  }

  typeDetails(){
    this.displayDetailsEvent.emit(this.type.lattinName)
  }
}
