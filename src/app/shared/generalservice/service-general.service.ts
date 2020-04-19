import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceGeneralService {

  constructor() { }

  transformeToObjet(id){
    return {'id' : id};
      
  }
  transformeToId(objet){
    return  ""+objet.id+"";
      
  }
}
