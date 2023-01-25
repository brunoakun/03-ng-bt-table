import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Tabla03Component } from './tablas/tabla03/tabla03.component';
import { Tabla02Component } from './tablas/tabla02/tabla02.component';
import { Tabla01Component } from './tablas/tabla01/tabla01.component';
import { Tabla04Component } from './tablas/tabla04/tabla04.component';


const rutas: Routes = [
  { path: 'tabla01', component: Tabla01Component },
  { path: 'tabla02', component: Tabla02Component },
  { path: 'tabla03', component: Tabla03Component },
  { path: 'tabla04', component: Tabla04Component },

  { path: '', redirectTo: 'tabla01', pathMatch: 'full' },
  { path: '**', redirectTo: 'tabla01', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(rutas, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
