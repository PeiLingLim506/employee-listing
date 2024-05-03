import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'unique' })
export class UniquePipe<T> implements PipeTransform {
  transform(value: T[], prop: keyof T): T[] {
    return value.filter((item, index, self) => self.findIndex(i => i[prop] === item[prop]) === index);
  }
}
