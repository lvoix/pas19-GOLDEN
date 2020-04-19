import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { take, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate  {

    
 
    constructor(private acct : AuthService, private router: Router ) { }

    canActivate( route: ActivatedRouteSnapshot, state : RouterStateSnapshot) : Observable<boolean> 
    {
        return this.acct.isLoggesIn.pipe(take(1), map((loginStatus : boolean) => 
        {
              const destination: string  = state.url;
              const productId = route.params.id; 

             console.log('arrrivee guard canactive');
            // To check if user is not logged in
            console.log('login status' + loginStatus);
            if(!loginStatus) 
            {
                this.router.navigate(['/login']); // , {queryParams: {returnUrl : state.url}}

                return false;
            }
            // if the user is already logged in
            switch(destination) 
            {
                case '/products' :
                case '/products/' + productId :
                {
                        if(localStorage.getItem("userRole") === "Customer" || localStorage.getItem("userRole") === "Admin" || localStorage.getItem("userRole") === "Moderator") 
                        {
                            return true;
                        }
                }

               case '/products/update' : 
                {
                        if(localStorage.getItem("userRole") === "Customer" || localStorage.getItem("userRole") === "Moderator") 
                        {
                            this.router.navigate(['/access-denied'])

                            return false;
                         }

                        if(localStorage.getItem("userRole") === "Admin") 
                        {

                            return true;
                        }

                }

               default:
                    return true;
            }           
          
        }));

      
    } 



}
