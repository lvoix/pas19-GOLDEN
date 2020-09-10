import { NgModule } from '@angular/core';
import { VoyageComponent } from './operations/operation-add/voyage/voyage.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';


/* Feature Components */
import { WorkComponent }      from './operations/operation-add/work/work.component';
import { AddressComponent }   from './operations/operation-add/address/address.component';
import { ResultComponent }    from './operations/operation-add/result/result.component';

/* Routing Module */
import { GestionsRoutingModule }   from './gestions-routing.module';
import { PersonalComponent } from './operations/operation-add/personal/personal.component';
import { toDatePipe } from '../shared/pipes/toDatePipe';



@NgModule({
    declarations: [ VoyageComponent , PersonalComponent, WorkComponent, AddressComponent, ResultComponent,
        toDatePipe],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        GestionsRoutingModule,
         
    ]
})
export class GestionsModule {
}
