import { Component, OnInit, Input } from '@angular/core';
import { PlantType } from '../plant-type.model';

@Component({
  selector: 'app-type-card',
  templateUrl: './type-card.component.html',
  styleUrls: ['./type-card.component.scss']
})
export class TypeCardComponent implements OnInit {

  @Input() type: PlantType;

  constructor(){}

  ngOnInit(){
    alert(this.type)
  }

}
