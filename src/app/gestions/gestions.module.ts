import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoyagesComponent } from './components/voyages/voyages.component';
import { VoyageComponent } from './components/voyage/voyage.component';
import { VoyageListComponent } from './components/voyage-list/voyage-list.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Feature Components */
import { PersonalComponent }  from './components/personal/personal.component';
import { WorkComponent }      from './components/work/work.component';
import { AddressComponent }   from './components/address/address.component';
import { ResultComponent }    from './components/result/result.component';

/* Routing Module */
import { GestionsRoutingModule }   from './gestions-routing.module';



@NgModule({
    declarations: [VoyagesComponent, VoyageComponent, VoyageListComponent , PersonalComponent, WorkComponent, AddressComponent, ResultComponent],
    imports: [
        FormsModule,
        CommonModule,
        GestionsRoutingModule,
        BrowserAnimationsModule,
    ]
})
export class GestionsModule {
}
