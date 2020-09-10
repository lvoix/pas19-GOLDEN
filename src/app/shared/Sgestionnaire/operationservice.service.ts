import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServiceGeneralService } from '../generalservice/service-general.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createRequestOption } from '../util/request-util';
type EntityArrayResponseType = HttpResponse<any[]>;


@Injectable({
  providedIn: 'root'
})
export class OperationserviceService {
  Uoperation = 'operations';
  dated : any;
  datef : any;
  public resourceUrl = environment.apiVL + this.Uoperation;
  constructor(private http: HttpClient, private sgenerale : ServiceGeneralService) { }


  public createOperation(operation) {
    return this.http.post<any>(environment.apiVL + this.Uoperation, operation);
  }
  public updateOperation(operation) {
    return this.http.put<any>(environment.apiVL + this.Uoperation, operation);
  }

  public MakeObjectOperation(ObjectOperation, stations){
     ObjectOperation.adressesLoad = [];
     ObjectOperation.adressesLivraison = [];
     ObjectOperation.linesConducteurs = {};

     ObjectOperation.beneficiaire = {"id" : parseInt(ObjectOperation.beneficiaire)};
     ObjectOperation.tracteurs = {"id" : parseInt(ObjectOperation.tracteurs)};
     ObjectOperation.remorques = {'id' : parseInt(ObjectOperation.remorques)};
     ObjectOperation.conducteurs1 = {"id" : parseInt(ObjectOperation.conducteurs1)};
     ObjectOperation.conducteurs2 = {"id" : parseInt(ObjectOperation.conducteurs2)};

     ObjectOperation.lineV1.vehicules =  ObjectOperation.tracteurs;
     ObjectOperation.lineV2.vehicules =  ObjectOperation.remorques;
     ObjectOperation.lineC1.conducteurs =  ObjectOperation.conducteurs1;
     ObjectOperation.lineC2.conducteurs =  ObjectOperation.conducteurs2;

     ObjectOperation.datedepart = new Date( this.sgenerale.convertTodate(ObjectOperation.datedepart));
     ObjectOperation.dateFin = new Date( this.sgenerale.convertTodate(ObjectOperation.dateFin));

     stations.forEach(item => {
       if(item.typeStation == "C")
        ObjectOperation.adressesLoad.push(item); 
       if(item.typeStation == "L")
        ObjectOperation.adressesLivraison.push(item); 
      });  
      return ObjectOperation;
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<any>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    return res;
  }

  deleteOperation(operation){
    return this.http.delete<any>(environment.apiVL + this.Uoperation + '/' + operation.id);
  }

}
