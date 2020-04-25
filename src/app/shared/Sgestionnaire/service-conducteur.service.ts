import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Entite } from './entites-service.service';


export class Conducteur{
  constructor(
    public id:string,
    public nom:string,
    public prenom:string,
    public cni:string,
    public cnss:Date,
    public entites: Entite,
    public type: string,
    public libelle:string,
    public status:string,
    public email:string,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class ServiceConducteurService {
  Uconducteur = 'conducteurs';
  
  constructor(private http: HttpClient) { 
  }

  loadPage(page, size) {
    return this.http.get<any>(environment.apiVL + this.Uconducteur+'?page='+page+'&size='+size)
   }
   public deleteConducteur(conducteur) {
    return this.http.delete<Conducteur>(environment.apiVL + this.Uconducteur + '/' + conducteur.id);
  }
  public createConducteur(conducteur) {
    return this.http.post<Conducteur>(environment.apiVL + this.Uconducteur, conducteur);
  }
  public updateConducteur(conducteur){
    return this.http.put<Conducteur>(environment.apiVL + this.Uconducteur, conducteur);

  }
}
