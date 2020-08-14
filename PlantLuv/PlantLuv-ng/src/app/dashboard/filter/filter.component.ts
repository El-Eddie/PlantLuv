import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']

})

export class FilterComponent implements OnInit {

  @Input() placeholder_text: string;
  @Output() filterChangeEvent: EventEmitter<string> = new EventEmitter();

  filterInput: FormControl
  constructor() { }

  ngOnInit(): void {
    this.filterInput = new FormControl();
    if(isNullOrUndefined(this.placeholder_text)){
      this.placeholder_text = "filter..."
    }

    this.filterInput.valueChanges.pipe(debounceTime(500)).subscribe((val) =>
      this.filterChangeEvent.emit(val)
    )
  }


  filterChange(input: any){
  }
}
