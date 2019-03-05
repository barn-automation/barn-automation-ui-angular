import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventTypeFilter'
})
export class EventTypeFilterPipe implements PipeTransform {

  transform(value: any[], type: string): any {
    if(!value) return [];
    if(!type) return value;
    return value.filter( it => {
      return it.type === type;
    });
  }

}
