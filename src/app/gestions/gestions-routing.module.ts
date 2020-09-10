import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalComponent }    from './operations/operation-add/personal/personal.component';
import { WorkComponent }        from './operations/operation-add/work/work.component';
import { AddressComponent }     from './operations/operation-add/address/address.component';
import { ResultComponent }      from './operations/operation-add/result/result.component';
import { WorkflowGuard }        from './operations/operation-add/workflow/workflow-guard.service';
import { VoyageComponent } from './operations/operation-add/voyage/voyage.component';
import { CommonModule } from '@angular/common';


export const appRoutesStep: Routes = [
  {  path: '',  component: VoyageComponent,
children :[
    // 1st Route
    { path: 'personal',  component: PersonalComponent },
    // 2nd Route
    { path: 'work',  component: WorkComponent },
    // 3rd Route
    { path: 'address',  component: AddressComponent },

    // 4th Route
    { path: 'result',  component: ResultComponent, canActivate: [WorkflowGuard] },
    // 5th Route
    //{ path: '',   redirectTo: '/personal', pathMatch: 'full' },
    // 6th Route
    //{ path: '**', component: PersonalComponent }
  ]},
];


@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(appRoutesStep)],
  exports: [RouterModule],
  providers: [WorkflowGuard]
})
export class GestionsRoutingModule { }
