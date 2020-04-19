import { NgModule } from '@angular/core';
import { VoyageComponent } from './operations/voyage/voyage.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';


/* Feature Components */
import { WorkComponent }      from './operations/work/work.component';
import { AddressComponent }   from './operations/address/address.component';
import { ResultComponent }    from './operations/result/result.component';

/* Routing Module */
import { GestionsRoutingModule }   from './gestions-routing.module';
import { PersonalComponent } from './operations/personal/personal.component';



@NgModule({
    declarations: [ VoyageComponent , PersonalComponent, WorkComponent, AddressComponent, ResultComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        GestionsRoutingModule     
    ]
})
export class GestionsModule {
}
