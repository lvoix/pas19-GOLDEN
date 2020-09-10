import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toDate'})
export class toDatePipe implements PipeTransform {
  transform(value: Object): string {
    let result = "" ;
    var messages= JSON.stringify(value);
    if(value != null)
    {
      result =""+value["day"]+"/"+value["month"]+"/"+value["year"]+"";
     
    }
    return result;
  }
}