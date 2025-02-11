import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrEmpty } from '../helpers/utils';

@Pipe({
   name: 'hashtag',
   standalone: true,
})
export class HashtagPipe implements PipeTransform {
   transform(value: string): string {
      if (isNullOrEmpty(value)) {
         return value;
      }

      return `#${value}`;
   }
}
