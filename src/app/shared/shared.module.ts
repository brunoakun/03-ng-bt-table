import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertaComponent } from './alerta/alerta.component';
import { LoadingComponent } from './loading/loading.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AlertaComponent,
    LoadingComponent,
    MenuComponent
  ],
  exports: [
    AlertaComponent,
    LoadingComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
