import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationIcon'
})
export class NotificationPipe implements PipeTransform {

  transform(value: boolean): string {
    if (value){ return "notifications_active" }
    else { return "notifications_none" }
  }

}
