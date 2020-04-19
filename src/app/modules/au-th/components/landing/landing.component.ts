import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  isLoggedIn = true;

  constructor(
    //private route: ActivatedRoute,
    //private router: Router,
    //private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
/*     this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    console.log('menu ->' + this.isLoggedIn); */
  }

  handleLogout() {
   // this.authenticationService.logout();
  }

}
