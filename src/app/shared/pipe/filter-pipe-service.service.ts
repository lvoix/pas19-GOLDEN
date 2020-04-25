import { Injectable, PipeTransform, Pipe } from '@angular/core';
import { Vehicule } from '../Sgestionnaire/vehicule-service.service';

@Pipe({
  name: 'filter'
})
@Injectable({
  providedIn: 'root'
})
export class FilterPipeServiceService implements PipeTransform{

  constructor() { }
/*    transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }

    return items.filter(singleItem =>
      singleItem[field].toLowerCase().includes(value.toLowerCase())
    );
  }  */
  transform(items: any, filter: any, defaultFilter: boolean): any {
    console.log('Ok filter'+ JSON.stringify(filter));
    //console.log('Ok items'+ JSON.stringify(items));

    if (!filter){
      return items;
    }

    if (!Array.isArray(items)){
      return items;
    }

    if (filter || Array.isArray(items)) {
      let filterKeys = Object.keys(filter);

      if (defaultFilter) {
        return items.filter(item =>
            filterKeys.reduce((x, keyName) =>
                (x || new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
      }
      else {
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
          });
        });
      }
    }
  }
  /* transform(list: any, matricule: any, matriculeSearch: any, genreSearch: any, typeSearch: any): any {

    if (((matricule.length > 0) || (matriculeSearch.length > 0) || (genreSearch.length > 0) || (typeSearch.length > 0))) {
       let temp: Vehicule[] = [];

       let tempCat: Vehicule[] = [];

       for (let i = 0; i < list.length; i++) {
           if ((list[i].category.toUpperCase().includes(matriculeSearch.toUpperCase())) && (list[i].genreSearch.toUpperCase().includes(typeSearch.toUpperCase())) && (list[i].genreSearch.toUpperCase().includes(genreSearch.toUpperCase()))) {
               tempCat.push(list[i]);
           }
       }
       temp = tempCat;

       if (matricule.length > 0) {
        matricule = matricule.trim();

            if (temp.length == 0) {
                for (let i = 0; i < list.length; i++) {

                     if (list[i].matriculeSearch.toUpperCase().includes(matricule.toUpperCase()) || list[i].genreSearch.toUpperCase().includes(matricule.toUpperCase())) {
                        temp.push(list[i]);
                     }
               }
            } else {

         let tempSearch: Vehicule[] = [];

     for (let i = 0; i < temp.length; i++) {
        if (temp[i].matricule.toUpperCase().includes(matricule.toUpperCase()) || temp[i].genre.toUpperCase().includes(matricule.toUpperCase())) {
             tempSearch.push(temp[i]);
        }
     }

     temp = tempSearch;
   }

 }

         return temp;
     } else {
       return list;
       }

} */
}
