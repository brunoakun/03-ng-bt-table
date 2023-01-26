import { ToastrService } from 'ngx-toastr';
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

  // Ordenación
  sortField: string = '';
  sortOrder: 'asc' | 'desc' | undefined;
  camposOrdenables = ['nombre', 'email', 'salario'];

  // Paginación
  page: number = 1;
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizes = [5, 10, 15, 20];
  totalPersonas: number = 0;

  // Búsqueda
  searchText = "";

  loading: boolean = false;
  errMsg: string = '';

  constructor(
    private _datos: DatosService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loading = true;
    this._datos.getPersonas().subscribe((respuesta) => {
      this.toastr.success('Datos cargados...', 'Correcto');      
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


  search() {
    if (this.searchText) {
      let searchValue = this.searchText.toLowerCase();
      this.personas = this.personasTbl.filter((persona: Persona) => {
        return (
          persona.nombre!.toLowerCase().match(searchValue) ||
          persona.email!.toLowerCase().match(searchValue)
        );
      });
    } else {
      this.personas = this.personasTbl;
    }
    this.refreshPersonas();
  }

  sort(campo: string) {
    if (!this.camposOrdenables.includes(campo)) {
      return;
    }
    if (this.sortField === campo) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = campo;
      this.sortOrder = 'asc';
    }

    this.personas.sort((a, b) => {
      if (!Object.keys(a).includes(campo) || !Object.keys(b).includes(campo)) {
        return 0;
      }
      const isAsc = this.sortOrder === 'asc';
      const valueA = a[campo];
      const valueB = b[campo];
      return compare(valueA, valueB, isAsc);
    });

    this.refreshPersonas();

    function compare(a: any, b: any, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }




}
