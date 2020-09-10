import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UploadfileService {

  private baseUrl = 'http://localhost:8091';

  constructor(private http: HttpClient,  private authser : AuthService) { }

  upload(fileInfoDTO , file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    console.log('file formdata', file);

    formData.append('name', fileInfoDTO.name);
    formData.append('entityId', fileInfoDTO.entityId);
    formData.append('size', fileInfoDTO.size);
    formData.append('extention', fileInfoDTO.extention);
    formData.append('entityType', 'account');
    formData.append('result', 'example');
    formData.append('file', file);
   // formData.append('fileInfoDTO', fileInfoDTO);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
     // headers: headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
  
  getFilesBYID(idoperation): Observable<any> {
    console.log('2-----get files all operation',idoperation);
    return this.http.get(`${this.baseUrl}/files/${idoperation}`);
  }
}
