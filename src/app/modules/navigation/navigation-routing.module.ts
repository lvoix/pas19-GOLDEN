import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DragdropComponent } from './components/dragdrop/dragdrop.component';
import { TableComponent } from './components/table/table.component';
import { AddressComponent } from './components/address/address.component';
import { VoyageListComponent } from 'src/app/gestions/operations/voyage-list/voyage-list.component';
import { AuthGuardService } from 'src/app/shared/guards/auth-guard.service';
import { VehiculeListComponent } from 'src/app/gestions/vehicules/vehicule-list/vehicule-list.component';
import { VehiculeComponent } from 'src/app/gestions/vehicules/vehicule/vehicule.component';
import { VehiculeEditComponent } from 'src/app/gestions/vehicules/vehicule-edit/vehicule-edit.component';
import { ConducteurListComponent } from 'src/app/gestions/conducteurs/conducteur-list/conducteur-list.component';
import { ConducteurComponent } from 'src/app/gestions/conducteurs/conducteur/conducteur.component';
import { ConducteurEditComponent } from 'src/app/gestions/conducteurs/conducteur-edit/conducteur-edit.component';
import { OperationsComponent } from 'src/app/gestions/operations/operations/operations.component';
import { OperationComponent } from 'src/app/gestions/operations/operation/operation.component';

const routes: Routes = [
  { path: '', component: NavComponent,
    children :[
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'vehiculeslist', component: VehiculeListComponent},
      { path: 'vehicule', component: VehiculeComponent},
      { path: 'vehicule/:editv', component: VehiculeEditComponent},
      { path: 'operation/:edito', component: OperationComponent},
      { path: 'conducteurslist', component: ConducteurListComponent},
      { path: 'conducteur', component: ConducteurComponent},
      { path: 'conducteur/:editv', component: ConducteurEditComponent},
      { path: 'table', component: TableComponent },
      { path: 'address', component: AddressComponent },
      { path: 'dragdrop', component: DragdropComponent },
      { path: 'voyagelist', component: VoyageListComponent , canActivate : [AuthGuardService]},
      { path: 'operations', component : OperationsComponent},
      { path: 'operations/add', loadChildren: 'src/app/gestions/gestions.module#GestionsModule'}
    ]},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
