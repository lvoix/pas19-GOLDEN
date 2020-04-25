import { NgModule } from '@angular/core';
import { NavigationRoutingModule } from './navigation-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { TableComponent } from './components/table/table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragdropComponent } from './components/dragdrop/dragdrop.component';
import { AddressComponent } from './components/address/address.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { VoyageListComponent } from 'src/app/gestions/operations/voyage-list/voyage-list.component';
import { FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { VehiculeComponent } from 'src/app/gestions/vehicules/vehicule/vehicule.component';
import { VehiculeEditComponent } from 'src/app/gestions/vehicules/vehicule-edit/vehicule-edit.component';
import { VehiculeListComponent } from 'src/app/gestions/vehicules/vehicule-list/vehicule-list.component';
import { FilterPipeServiceService } from 'src/app/shared/pipe/filter-pipe-service.service';
import {DataTablesModule} from 'angular-datatables';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { toDatePipe } from 'src/app/shared/pipe/toDatePipe';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { ConducteurListComponent } from 'src/app/gestions/conducteurs/conducteur-list/conducteur-list.component';
import { ConducteurEditComponent } from 'src/app/gestions/conducteurs/conducteur-edit/conducteur-edit.component';
import { ConducteurComponent } from 'src/app/gestions/conducteurs/conducteur/conducteur.component';

@NgModule({
  declarations: [NavComponent, DashboardComponent, TableComponent, DragdropComponent,
    AddressComponent, VoyageListComponent, VehiculeComponent, VehiculeEditComponent, VehiculeListComponent, FilterPipeServiceService,
     toDatePipe, JwPaginationComponent, ConducteurListComponent, ConducteurComponent, ConducteurEditComponent],
  imports: [
    DataTablesModule,
    NavigationRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    DragDropModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    NgxPaginationModule,
    CommonModule,
    NgbModule
  ]
})
export class NavigationModule { }
