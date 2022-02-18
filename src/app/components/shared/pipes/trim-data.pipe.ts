import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimData'
})
export class TrimDataPipe implements PipeTransform {

  transform(value: string, characters: number): string {
    return value.length-3 > characters ? `${value.slice(0, characters)}...` : value;
  }

}
