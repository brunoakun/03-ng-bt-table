import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule  } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Tabla01Component } from './tabla01/tabla01.component';
import { Tabla02Component } from './tabla02/tabla02.component';
import { Tabla03Component } from './tabla03/tabla03.component';
import { Tabla04Component } from './tabla04/tabla04.component';

import { SortIconDirective } from './sort-icon.directive';
import { BbwkComponent } from './bbwk/bbwk.component';



@NgModule({
  declarations: [
    Tabla01Component,
    Tabla02Component,
    Tabla03Component,
    Tabla04Component,
    SortIconDirective,
    BbwkComponent
  ],
  exports: [
    Tabla01Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbModule      
  ] 
})
export class TablasModule { }
