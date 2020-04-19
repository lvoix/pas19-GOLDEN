import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DragdropComponent } from './components/dragdrop/dragdrop.component';
import { TableComponent } from './components/table/table.component';
import { AddressComponent } from './components/address/address.component';
import { VoyageListComponent } from 'src/app/gestions/components/voyage-list/voyage-list.component';


const routes: Routes = [
  { path: '', component: NavComponent,
    children :[
      { path: 'dashboard', component: DashboardComponent },
      { path: 'table', component: TableComponent },
      { path: 'address', component: AddressComponent },
      { path: 'dragdrop', component: DragdropComponent },
      { path: 'voyagelist', component: VoyageListComponent },
      { path: 'AddOrEditvoyage', loadChildren: 'src/app/gestions/gestions.module#GestionsModule'}
    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
