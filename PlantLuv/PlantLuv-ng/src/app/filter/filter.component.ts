import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  template: `
      <input id="filter" type="text" [formControl]="formControl"
        (input)="filterChange(this)" placeholder="Filter..."
      />
  `,
  styles: [`
    #filter{
      padding-left:10px;
      border-radius:10px;
      width:300px;
      height: 1.5em
    }
  `]
})

export class FilterComponent implements OnInit {

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
