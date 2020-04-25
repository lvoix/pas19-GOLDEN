import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/Sgestionnaire/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  LoginStatus$ : Observable<boolean>;

  UserName$ : Observable<string>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private acct : AuthService) {}
  ngOnInit() {

    this.LoginStatus$ = this.acct.isLoggesIn;
    console.log('arrrivee  nave 1');
    this.UserName$ = this.acct.currentUserName;
    console.log('arrrivee  nave 2');
 
    }

onLogout() 
{
  // this.productservice.clearCache();
   this.acct.logout();
}
}
