import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'func' })
export class FunctionPipe implements PipeTransform {
  transform(value: any, handler: (value: any) => any, context?: any): any {
    return context ? handler.call(context, value) : handler(value);
  }
}
