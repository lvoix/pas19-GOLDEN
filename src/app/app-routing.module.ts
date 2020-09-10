import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotfoundComponent } from './shared/components/page-notfound/page-notfound.component';

const routes: Routes = [
  { path: 'home',
  loadChildren: 'src/app/modules/navigation/navigation.module#NavigationModule' },
  { path: '',
  loadChildren: 'src/app/modules/au-th/au-th.module#AuThModule' },
  { path: '**', component: PageNotfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
