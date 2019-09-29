import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionsRoutingModule } from './gestions-routing.module';
import { VoyagesComponent } from './components/voyages/voyages.component';
import { VoyageComponent } from './components/voyage/voyage.component';
import { VoyageListComponent } from './components/voyage-list/voyage-list.component';


@NgModule({
  declarations: [VoyagesComponent, VoyageComponent, VoyageListComponent],
  imports: [
    CommonModule,
    GestionsRoutingModule
  ]
})
export class GestionsModule { }
