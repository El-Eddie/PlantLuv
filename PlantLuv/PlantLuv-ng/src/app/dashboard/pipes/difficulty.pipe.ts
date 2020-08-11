import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficultyIcons'
})
export class DifficultyPipe implements PipeTransform {

  transform(value: string): string {
    if (typeof (value) != "string") { return "stars-1" }

    switch (value.toUpperCase()) {
      case "BEGINNER": { return "stars-1" }
      case "ELEMENTARY": { return "stars-2" }
      case "INTERMEDIATE": { return "stars-3" }
      case "ADVANCE": { return "stars-4" }
      case "EXPERT": { return "stars-5" }
      default: { return "stars-1" }
    }
  }
}
