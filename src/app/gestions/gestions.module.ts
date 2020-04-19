import { NgModule } from '@angular/core';
import { VoyageComponent } from './components/voyage/voyage.component';


/* Feature Components */
import { PersonalComponent }  from './components/personal/personal.component';
import { WorkComponent }      from './components/work/work.component';
import { AddressComponent }   from './components/address/address.component';
import { ResultComponent }    from './components/result/result.component';

/* Routing Module */
import { GestionsRoutingModule }   from './gestions-routing.module';



@NgModule({
    declarations: [ VoyageComponent , PersonalComponent, WorkComponent, AddressComponent, ResultComponent],
    imports: [

        GestionsRoutingModule
    ]
})
export class GestionsModule {
}
