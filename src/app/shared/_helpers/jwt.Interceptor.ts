import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class JwtInterceptor implements HttpInterceptor {

    constructor (private acct : AuthService) {}

    intercept(request : HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>> 
    {
        console.log('arrrivee  JwtInterceptor');
        // add authorization header with jwt token if available
        let currentuser = this.acct.isLoggesIn;
        let token = localStorage.getItem('jwt');
        let username = localStorage.getItem('username');
        let password = localStorage.getItem('password');

        console.log('arrrivee  JwtInterceptor currentuser'+ username+ password + currentuser + token);

        if (currentuser && token !== undefined) 
        {
            request = request.clone({
                setHeaders: 
                {
                    Authorization: 'Basic ' + window.btoa(username + ':' + password)
       
                }
            });
     
        }
        console.log('arrrivee  request'+ JSON.stringify(request) );
        return next.handle(request);
        
   
    }
}