import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class Entite{
  constructor(
    public id: string,
    public name: string,
    public gerant: string,
    public customerType: string,
    public dateCreation: Date,
    public rc: string,
    public patente: string,
    public cnss: string,

  ) {}
 
}

@Injectable({
  providedIn: 'root'
})
export class EntitesServiceService {
  Uentite = 'entites';

  constructor(private http: HttpClient) { }

  GetAllEntites() {
    return this.http.get<Entite[]>(environment.apiVL + this.Uentite);
  }
}
