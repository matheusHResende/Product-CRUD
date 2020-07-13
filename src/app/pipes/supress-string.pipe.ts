import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'supressString'
})
export class SupressStringPipe implements PipeTransform {

  transform(value: string, maxSize: number = 140): string {
    return value.slice(0, maxSize) + (value.length > maxSize ? '...' : '');
  }

}
