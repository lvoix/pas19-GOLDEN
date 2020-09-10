import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiareService {

  Ubeneficiare = 'beneficiaires';

  constructor(private http: HttpClient) { }

  GetAllBeneficiare() {
    return this.http.get<any[]>(environment.apiVL + this.Ubeneficiare);
  }
}
