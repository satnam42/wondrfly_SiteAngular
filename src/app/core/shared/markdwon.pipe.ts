import { Pipe, PipeTransform } from '@angular/core';
import * as markdown from "marked";

@Pipe({
  name: 'markdown'
})
export class MarkdwonPipe implements PipeTransform {

  transform(value: any): any {
    if (value && value.length > 0) {
      return markdown(value);
    }
    return value;
  }

}
