import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'page'
})
export class PagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
