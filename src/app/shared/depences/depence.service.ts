import { Injectable } from '@angular/core';
import { Depence } from './depence.model';

@Injectable({
  providedIn: 'root'
})
export class DepenceService {
  formData: Depence;
  DepencesAll:Depence[];
  constructor() { }
}
