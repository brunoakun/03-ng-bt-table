import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  apiURL: string = environment.apiURL;
  constructor(public http: HttpClient) { }

  getPersonas() {
    const path = `${this.apiURL}/personas/list`;
    return this.http.get<any>(path);
  }

}
