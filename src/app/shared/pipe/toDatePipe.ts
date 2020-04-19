import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toDate'})
export class toDatePipe implements PipeTransform {
  transform(value: Object): string {
    let result = "" ;
    console.log("message valueee to date 1", value);
    var messages= JSON.stringify(value);
    console.log("message valueee to date 2", messages);

    if(value != null)
    {
     // result =""+value["day"]+"/"+value["month"]+"/"+value["year"]+"";
        result = ""+value+"";
     
    }
    return result;
  }
}