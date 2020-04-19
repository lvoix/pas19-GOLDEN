import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home',
  loadChildren: 'src/app/modules/navigation/navigation.module#NavigationModule' },
  { path: '',
  loadChildren: 'src/app/modules/au-th/au-th.module#AuThModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
