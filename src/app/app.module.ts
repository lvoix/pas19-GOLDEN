import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { AuThModule } from './modules/au-th/au-th.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { toDatePipe } from './shared/pipes/toDatePipe';

/* Shared Service */

import { AgmCoreModule } from '@agm/core';
import { JwtInterceptor } from './shared/_helpers/jwt.Interceptor';
import {} from 'googlemaps';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { VehiculeServiceService } from './shared/Sgestionnaire/vehicule-service.service';
import { FilterPipeServiceService } from './shared/pipe/filter-pipe-service.service';
import {DataTablesModule} from 'angular-datatables';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EntitesServiceService } from './shared/Sgestionnaire/entites-service.service';
import { ServiceGeneralService } from './shared/generalservice/service-general.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { MatDividerModule, MatSnackBarModule } from '@angular/material';
import { PageNotfoundComponent } from './shared/components/page-notfound/page-notfound.component';
import { NotificationService } from './shared/generalservice/notification.service';
import { DatePipe } from '@angular/common';
import { MyFilterPipe } from './shared/pipes/MyFilterPipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OperationserviceService } from './shared/Sgestionnaire/operationservice.service';
import { UploadfileService } from './shared/Sgestionnaire/uploadfile.service';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { PopentiteComponent } from './gestions/operations/popentite/popentite.component';
import { DepenceComponent } from './gestions/operations/operation-add/depence/depence.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotfoundComponent,
    ConfirmationDialogComponent,
    PopentiteComponent,
    DepenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuThModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    DataTablesModule,
    DatePickerModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    AgmCoreModule.forRoot({
      //AIzaSyAjUHpiDhHJwk0vCMayeOTvEB08RXI1YCg
      apiKey : 'AIzaSyAU8YiIgyLCDlLD5SwXX5RaGMga1Xzx1eI',
      libraries : ['places']
    }),
    NgbModule,NgbPaginationModule, NgbAlertModule

  ],
  entryComponents: [
    ConfirmationDialogComponent,
    PopentiteComponent,
    DepenceComponent
  ],
  providers:   
   [ 
     AuthGuardService,
     VehiculeServiceService,
     FilterPipeServiceService,
     EntitesServiceService,
     ServiceGeneralService,
     OperationserviceService,
     NotificationService,
     JwtInterceptor,
     UploadfileService,
     DatePipe,
     MyFilterPipe,
     {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
