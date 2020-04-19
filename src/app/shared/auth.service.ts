import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { decode } from 'punycode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public username: String;
  public password: String;
  private tokens: any;
      // User related properties
      private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
      private UserName    = new BehaviorSubject<string>(localStorage.getItem('username'));
      private UserRole    = new BehaviorSubject<string>(localStorage.getItem('userRole')); 
      
  constructor(private http: HttpClient, private router: Router) { 
   
  }

  login(username: string, password: string) {
    const  headers = new  HttpHeaders().set('Authorization', 'Basic ' + btoa( username + ':' + password));
        return this.http.get(environment.apiURL, { headers: headers }).toPromise();

}

authenticationService(username: string, password: string) {
  return this.http.get(environment.apiURL,
    { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
      console.log('info resulta ====>', res);
      this.tokens = res;
      console.log('token ====>', this.tokens.token.token);
      localStorage.setItem('token', this.tokens.token.token);
      this.username = username;
      this.password = password;
      this.registerSuccessfulLogin(username, password);
     
      localStorage.setItem('loginStatus', '1');
      localStorage.setItem('jwt', this.tokens.token.token);
      localStorage.setItem('username', this.tokens.username);
      localStorage.setItem('expiration', this.tokens.token.expiredIn);
      localStorage.setItem('userRole', this.tokens.authorities);
      this.UserName.next(localStorage.getItem('username'));
      this.UserRole.next(localStorage.getItem('userRole'));  
      this.loginStatus.next(true);
    }));
}

createBasicAuthToken(username: string, password: string) {
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  return 'Basic ' + window.btoa(username + ':' + password);
}

registerSuccessfulLogin(username, password) {
  sessionStorage.setItem(username, password);
}

PostInfos() {
  var token = localStorage.getItem('token');
  console.log('tokennnn storage', token);
  const  headers = new  HttpHeaders().set('token', token);
  headers.set('Content-Type', 'application/json');
  console.log('headers storage', headers);
  var body = {"draw": 0, "page": 0, "offset": 10, "sort": "+id", "search": {}};
  return this.http.post(environment.apiCust+'/list',body, { headers: headers }).toPromise();
}

UpFile (){
    var token = localStorage.getItem('token');
    console.log('tokennnn storage', token);
    const  headers = new  HttpHeaders().set('token', token);
    headers.set('Content-Type', 'application/json');
    console.log('headers storage', headers);
    return headers;
}
extractData(res: Response) {
  let body = res.json();
  return body || { };
}
SaveInfos(InfosAddDTO){
  var token = localStorage.getItem('token');
  console.log('tokennnn storage', token);
  const  headers = new  HttpHeaders().set('token', token);
  headers.set('Content-Type', 'application/json');
  console.log('headers storage', headers);
  //var body = {"draw": 0, "page": 0, "offset": 10, "sort": "+id", "search": {}};
  //return this.http.post(environment.apiCust+'/save',InfosAddDTO, { headers: headers }).toPromise();
   console.log('eggggggggggggg');
  return this.http.post(environment.apiCust+'/save', InfosAddDTO, { headers: headers })
  .toPromise()
  .then(this.extractData)
  .catch(err => (err));
}

logout() 
{
    // Set Loginstatus to false and delete saved jwt cookie
    this.loginStatus.next(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    localStorage.setItem('loginStatus', '0');
    this.router.navigate(['/login']);
    console.log("Logged Out Successfully");

}




checkLoginStatus(): boolean {
   
  var loginCookie = localStorage.getItem("loginStatus");
    console.log('login cokie'+ loginCookie);
    if(loginCookie == "1") 
    {
        if(localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === undefined) 
        {
            return false;
        }
 
         // Get and Decode the Token
         //localStorage.clear();
         const token = localStorage.getItem('jwt');
         var expiration = localStorage.getItem('expiration');
         console.log('login expiration'+ expiration);

        // const decoded = jwt_decode(token);
        // Check if the cookie is valid
    /*      console.log('Your code decode'+ decoded);
         
        if(decoded.exp === undefined) 
        {
            return false;
        }  */

        // Get Current Date Time
        const date = new Date(0);
       // const date1 = new Date(1);

         // Convert EXp Time to UTC
       let tokenExpDate = date.setUTCSeconds(parseInt(expiration));
       console.log('login tokenExpDate'+ tokenExpDate);

        // If Value of Token time greter than 

         if(date.valueOf() == new Date().valueOf()) 
        {
          
            console.log('entreee date expiration');
            return true;
        }

        console.log("NEW DATE " + new Date().valueOf());
        console.log("Token DATE " + tokenExpDate.valueOf()); 

        return false;
      
    }
    return false;
}


get isLoggesIn() 
{
    return this.loginStatus.asObservable();
}

get currentUserName() 
{
    return this.UserName.asObservable();
}

get currentUserRole() 
{
    return this.UserRole.asObservable();
} 

}
