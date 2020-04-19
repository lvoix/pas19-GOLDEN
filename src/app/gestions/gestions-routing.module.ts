import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalComponent }    from './components/personal/personal.component';
import { WorkComponent }        from './components/work/work.component';
import { AddressComponent }     from './components/address/address.component';
import { ResultComponent }      from './components/result/result.component';

import { WorkflowGuard }        from './components/workflow/workflow-guard.service';
import { VoyageComponent } from './components/voyage/voyage.component';


export const appRoutesStep: Routes = [
  { path: '',  component: PersonalComponent,
children :[
    { path: 'voyage',  component: VoyageComponent },
    // 1st Route
    { path: 'personal',  component: PersonalComponent },
    // 2nd Route
    { path: 'work',  component: WorkComponent, canActivate: [WorkflowGuard] },
    // 3rd Route
    { path: 'address',  component: AddressComponent, canActivate: [WorkflowGuard] },
    // 4th Route
    { path: 'result',  component: ResultComponent, canActivate: [WorkflowGuard] },
    // 5th Route
    { path: '',   redirectTo: '/personal', pathMatch: 'full' },
    // 6th Route
    { path: '**', component: PersonalComponent }
  ]},
];


@NgModule({
  imports: [RouterModule.forChild(appRoutesStep)],
  exports: [RouterModule],
  providers: [WorkflowGuard]
})
export class GestionsRoutingModule { }
