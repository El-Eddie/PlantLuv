import { Observable } from 'rxjs';
import { publishLast, refCount } from 'rxjs/operators';

export function memorize<T>() {
  return (obs: Observable<T>) => obs.pipe(publishLast(), refCount());
}
