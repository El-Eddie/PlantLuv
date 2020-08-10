import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-filters',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']

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
