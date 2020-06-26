import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lightLevelIcon'
})
export class LightLevelPipe implements PipeTransform {

  transform(value: string): string {
    if (typeof(value) != "string") { return "light-med" }
    // console.log(value, typeof(value), value.toUpperCase())
    switch (value.toUpperCase()){
      case "LOW": { return "light-low"}
      case "LOW/MED": { return "light-medLow"}
      case "MED/HIGH": { return "light-medHigh" }
      case "HIGH": { return "light-high"}
      default: { return "light-med" }
    }
  }
}
