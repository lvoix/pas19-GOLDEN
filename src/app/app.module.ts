import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuThModule } from './modules/au-th/au-th.module';
import {
	IgxAvatarModule,
	IgxBadgeModule,
	IgxButtonModule,
	IgxGridModule,
	IgxIconModule,
	IgxInputGroupModule,
	IgxProgressBarModule,
	IgxRippleModule,
	IgxSwitchModule
 } from "igniteui-angular";
import { DataService } from  "src/app/gestions/components/voyage-list/services/data.service";
import { IgxSparklineCoreModule } from "igniteui-angular-charts/ES5/igx-sparkline-core-module";
import { IgxSparklineModule } from "igniteui-angular-charts/ES5/igx-sparkline-module";
import { VoyageListComponent } from './gestions/components/voyage-list/voyage-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    VoyageListComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuThModule,
    MaterialModule,
    IgxAvatarModule,
	IgxBadgeModule,
	IgxButtonModule,
	IgxGridModule,
	IgxIconModule,
	IgxInputGroupModule,
	IgxProgressBarModule,
	IgxRippleModule,
  IgxSwitchModule,
  IgxSparklineCoreModule,
  IgxSparklineModule,


  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
