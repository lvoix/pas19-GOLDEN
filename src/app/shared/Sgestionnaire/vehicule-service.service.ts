import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Entite } from './entites-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IVehicule } from 'src/app/gestions/vehicules/vehicule.model';
import { createRequestOption } from '../util/request-util';
type EntityArrayResponseType = HttpResponse<IVehicule[]>;
export class Vehicule{
  constructor(
    public id:string,
    public matricule:string,
    public vehiculeType:string,
    public genre:string,
    public dateCreation:Date,
    public entites: Entite,
    public model: string,
    public libelle:string,
    public status:string,
    public vcolor:string,
    public miseCirculation:Date,
    public email:string,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class VehiculeServiceService {
  Uvehicule = 'vehicules';
  public resourceUrl = environment.apiVL + this.Uvehicule;
  constructor(private http: HttpClient ) { 
  }

  GetAllVehicules() {
    let params = new HttpParams();
    params = params.append('page', '2');

    return this.http.get<Vehicule[]>(environment.apiVL + this.Uvehicule, {params : params});
  }
   loadPage(page, size) {
    // get page of items from api
    return this.http.get<any>(environment.apiVL + this.Uvehicule+'?pageNo='+page+'&pageSize='+size)
   }
   
  public deleteVehicule(vehicule) {
    return this.http.delete<Vehicule>(environment.apiVL + this.Uvehicule + '/' + vehicule.id);
  }

  public createVehicule(vehicule) {
    return this.http.post<Vehicule>(environment.apiVL + this.Uvehicule, vehicule);
  }
  public updateVehicule(vehicule){
    return this.http.put<Vehicule>(environment.apiVL + this.Uvehicule, vehicule);

  }
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<any>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    return res;
  }

  public ConvertENUMStringToInt1(vehicule){
    if(vehicule.genre == 'TRACTEUR')
      vehicule.genre = '0';
      if(vehicule.genre == 'REMORQUE')
         vehicule.genre = '1';
         else
           vehicule.genre = '2';
    return vehicule;
  }
  public ConvertENUMStringToInt2(vehicule){
    if(vehicule.status == "ENABLE")
      vehicule.status = '0';
      else{
      if(vehicule.status == "DISABLE")
         vehicule.status = '1';
         else
           vehicule.status = '';
        }
    return vehicule;
  }

 
}
