import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ServiceGeneralService {
    //Error Display
  error:any={isError:false,errorMessage:''};
  isValidDate : any;
  constructor(private datepipe: DatePipe) { }

  transformeToObjet(id){
    return {'id' : id};
      
  }
  transformeToId(objet){
    return  ""+objet.id+"";
      
  }
  convertTodate(date){
    console.log('dateeeeeeeeeeeeeeee useeeeeeeeeee'+ date);
    return this.datepipe.transform(new Date(date.year,date.month -1,date.day).toString(), 'yyyy-MM-dd');
  }
  validateDates(sDate: string, eDate: string){
    this.isValidDate = true;
    if((sDate == null || eDate ==null)){
      this.error={isError:true, errorMessage:'La date de début et la date de fin sont obligatoires.'};
      this.isValidDate = false;
    }

    if((sDate != null && eDate !=null) && (eDate) < (sDate)){
      this.error={isError:true, errorMessage:'La date de fin doit être supérieure à la date de début.'};
      this.isValidDate = false;  
    }
    var ob = {isValidDate : this.isValidDate, error : this.error};
    return ob;
  }
 }

