import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ServiceGeneralService } from '../generalservice/service-general.service';

@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    constructor(public datepipe: DatePipe, private generalservice : ServiceGeneralService){}

    transform(items: any[], filter: Object): any {
        var filteredArray = new Array();  
        let startDateArgs = this.generalservice.convertTodate (filter['fromDate']);
        let endDateArgs = this.generalservice.convertTodate (filter['toDate']);
        console.table(filter);
        console.table(items);
        if (!items || !filter) {
            return items;
        }

    if (items && items.length) {  
            items.forEach(item => {
                let dateCreation = this.datepipe.transform(item.dateCreation, 'yyyy-MM-dd');                 
                if (dateCreation >= startDateArgs && dateCreation <= endDateArgs) {  
                    filteredArray.push(item);  
                }  
            });  
        }  
        return filteredArray;  
    }
}