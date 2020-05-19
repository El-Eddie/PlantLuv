import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-plant-filter',
  templateUrl: './plant-filter.component.html',
  styleUrls: ['./plant-filter.component.scss']
})


export class PlantFilterComponent implements OnInit {

  @Output() filterChangeEvent: EventEmitter<string> = new EventEmitter();

  formControl: FormControl

  constructor() { }

  ngOnInit(): void {
    this.formControl = new FormControl();
  }

  filterChange(input: any){
    this.filterChangeEvent.emit(input.formControl.value);
  }

}
