import { Component, OnInit, Input, Output } from '@angular/core';
import { PlantType } from '../plant-type.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-type-card',
  templateUrl: './type-list-card.component.html',
  styleUrls: ['./type-list-card.component.scss']
})

export class TypeListCardComponent implements OnInit {

  @Input() type: PlantType;
  @Output() displayDetailsEvent: EventEmitter<PlantType> = new EventEmitter();

  constructor( ){}

  ngOnInit(){
  }

  typeDetails(){
    this. displayDetailsEvent.emit(this.type)
    // this.router.navigate([`./care/${encodeURI(name.toLocaleLowerCase())}`]);
  }
}