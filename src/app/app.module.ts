import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuThModule } from './modules/au-th/au-th.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
/* Shared Service */
import { FormDataService } from './gestions/operations/data/formData.service';
import { WorkflowService } from './gestions/operations/workflow/workflow.service';
import { AgmCoreModule } from '@agm/core';
import { JwtInterceptor } from './shared/_helpers/jwt.Interceptor'
import {} from 'googlemaps';
import { from } from 'rxjs';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { VehiculeServiceService } from './shared/Sgestionnaire/vehicule-service.service';
import { FilterPipeServiceService } from './shared/pipe/filter-pipe-service.service';
import {DataTablesModule} from 'angular-datatables';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EntitesServiceService } from './shared/Sgestionnaire/entites-service.service';
import { ServiceGeneralService } from './shared/generalservice/service-general.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuThModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    DataTablesModule,
    DatePickerModule,
    AgmCoreModule.forRoot({
      //AIzaSyAjUHpiDhHJwk0vCMayeOTvEB08RXI1YCg
      apiKey : 'AIzaSyAU8YiIgyLCDlLD5SwXX5RaGMga1Xzx1eI',
      libraries : ['places']
    })

  ],
  providers:   
   [ 
     AuthGuardService,
     VehiculeServiceService,
     FilterPipeServiceService,
     EntitesServiceService,
     ServiceGeneralService,
     JwtInterceptor,
     {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: FormDataService, useClass: FormDataService },
    { provide: WorkflowService, useClass: WorkflowService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
