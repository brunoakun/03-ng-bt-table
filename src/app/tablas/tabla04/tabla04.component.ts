import { DatosService } from './../../services/datos.service';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-tabla04',
  templateUrl: './tabla04.component.html',
  styleUrls: ['./tabla04.component.css']
})
export class Tabla04Component implements OnInit {
  personas: Persona[] = [];       // Personas a mostrar 
  personasTbl: Persona[] = [];    // Personas en la tabla
  personasPag: Persona[] = [];    // Personas a mostrar en página actual

  sortField: string = '';
  sortOrder: 'asc' | 'desc' | undefined;
  camposOrdenables = ['nombre', 'email', 'salario']

  page: number = 1;
  pageSize: number = 10;
  pageSizes = [5, 10, 15, 20];

  totalPersonas: number = 0;
  currentPage: number = 1;

  loading: boolean = false;
  errMsg: string = '';

  searchText = "";
  constructor(private _datos: DatosService) { }

  ngOnInit() {
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


  sortA(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }

    this.personas.sort((a, b) => {
      const isAsc = this.sortOrder === 'asc';
      switch (this.sortField) {
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        default: return 0;
      }
    });

    this.refreshPersonas();

    function compare(a: any, b: any, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }


  sort(field: string) {
    if (!this.camposOrdenables.includes(field)) {
      return;
    }
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }

    this.personas.sort((a, b) => {
      if (!Object.keys(a).includes(field) || !Object.keys(b).includes(field)) {
        return 0;
      }
      const isAsc = this.sortOrder === 'asc';
      const valueA = a[field];
      const valueB = b[field];
      return compare(valueA, valueB, isAsc);
    });

    this.refreshPersonas();

    function compare(a: any, b: any, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }




}
