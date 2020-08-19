import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toxisityIcon'
})
export class ToxisityPipe implements PipeTransform {

  transform(value: string): string {
    if (typeof (value) != "string") { return "toxic-safe" }

    switch (value.toUpperCase()) {
      case "DOGS": { return "toxic-dog" }
      case "CATS": { return "toxic-cat" }
      case "SMALL ANIMALS": { return "toxic-smallAnimal" }
      default: { return "toxic-safe" }
    }
  }
}
