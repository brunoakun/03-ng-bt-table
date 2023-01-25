import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { DatosService } from 'src/app/services/datos.service';


@Component({
  selector: 'app-tabla03',
  templateUrl: './tabla03.component.html',
  styleUrls: ['./tabla03.component.css']
})

export class Tabla03Component implements OnInit {

  personas: Persona[] = [];
  personasTbl: Persona[] = [];

  loading: boolean = false;
  errMsg: string = '';

  searchText = "";

  constructor(private _datos: DatosService) { }

  @ViewChildren(Tabla03Component) headers: QueryList<Tabla03Component> | undefined;

  ngOnInit(): void {
    this.loading = true;
    this._datos.getPersonas().subscribe((respuesta) => {
      this.loading = false;
      if (!respuesta || respuesta.error) {
        this.errMsg = respuesta.messages;
        return;
      }
      this.personasTbl = respuesta.data;
      this.personas = this.personasTbl;
    });
  }


  Search() {
    if (this.searchText) {
      let searchValue = this.searchText.toLowerCase();
      console.log(searchValue)

      this.personas = this.personasTbl.filter((persona: any) => {
        return (
          persona.nombre.toLowerCase().match(searchValue) ||
          persona.email.toLowerCase().match(searchValue)
        );
      });
    } else {
      this.personas = this.personasTbl;
    }
  }

}

