import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-filters',
  template: `
      <input id="filter" class="no-outline" type="text" [formControl]="formControl"
        (input)="filterChange(this)" [placeholder]="placeholder_text"
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

  @Input() placeholder_text: string;
  @Output() filterChangeEvent: EventEmitter<string> = new EventEmitter();

  formControl: FormControl
  constructor() { }

  ngOnInit(): void {
    this.formControl = new FormControl();
    if(isNullOrUndefined(this.placeholder_text)){
      this.placeholder_text = "filter..."
    }
  }

  filterChange(input: any){
    this.filterChangeEvent.emit(input.formControl.value);
  }
}
