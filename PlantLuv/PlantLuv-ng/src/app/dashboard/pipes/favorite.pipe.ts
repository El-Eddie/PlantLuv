import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favoriteIcon'
})
export class FavoritePipe implements PipeTransform {

  transform(value: boolean): string {
    if (value){ return "star" }
    else { return "star_outline" }
  }
}
