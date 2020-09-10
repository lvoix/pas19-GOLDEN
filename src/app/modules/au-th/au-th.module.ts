import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuThRoutingModule } from './au-th-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { FormsModule} from '@angular/forms';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, LandingComponent],
  imports: [
    CommonModule,
    AuThRoutingModule,
    FormsModule
  ]
})
export class AuThModule { }
