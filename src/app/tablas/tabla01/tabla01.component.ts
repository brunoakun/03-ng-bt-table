import { DatosService } from './../../services/datos.service';

import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';


@Component({
  selector: 'app-tabla01',
  templateUrl: './tabla01.component.html',
  styleUrls: ['./tabla01.component.css']
})
export class Tabla01Component implements OnInit {
  personas: Persona[] = [];

  loading: boolean = false;
  errMsg: string = '';

  constructor(private _datos: DatosService) { }

  ngOnInit(): void {
    this.loading = true;
    this._datos.getPersonas().subscribe((respuesta) => {
      this.loading = false;
      if (!respuesta || respuesta.error ) {
        this.errMsg = respuesta.messages;
        return;
      }
      this.personas = respuesta.data;
    });
  }

}