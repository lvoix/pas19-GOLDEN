import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuThModule } from './modules/au-th/au-th.module';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
/* Shared Service */
import { FormDataService }    from './gestions/components/data/formData.service';
import { WorkflowService }    from './gestions/components/workflow/workflow.service';

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
    NgxPaginationModule,


  ],
  providers:    [{ provide: FormDataService, useClass: FormDataService },
    { provide: WorkflowService, useClass: WorkflowService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
