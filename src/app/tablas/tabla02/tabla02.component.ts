import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { DatosService } from 'src/app/services/datos.service';
import { NgbPaginationConfig, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-tabla02',
  templateUrl: './tabla02.component.html',
  styleUrls: ['./tabla02.component.css']
})
export class Tabla02Component implements OnInit {
  personas: Persona[] = [];       // Personas a mostrar 
  personasTbl: Persona[] = [];    // Personas en la tabla
  personasPag: Persona[] = [];    // Personas a mostrar en página actual

  page: number = 1;
  pageSize: number = 10;
  pageSizes = [5, 10, 15, 20];

  totalPersonas: number = 0;
  currentPage: number = 1;

  loading: boolean = false;
  errMsg: string = '';

  searchText = "";

  constructor( private _datos: DatosService) {}

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
      this.refreshPersonas();
    });
  }

  refreshPersonas() {
    this.totalPersonas = this.personas.length;
    this.personasPag = this.personas.map((persona, i) => ({ id: i + 1, ...persona })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }


  Search() {
    if (this.searchText) {
      let searchValue = this.searchText.toLowerCase();
      console.log(searchValue);

      this.personas = this.personasTbl.filter((persona: any) => {
        return (
          persona.nombre.toLowerCase().match(searchValue) ||
          persona.email.toLowerCase().match(searchValue)
        );
      });
    } else {
      this.personas = this.personasTbl;
    }
    this.refreshPersonas();
  }

}