import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiUri: string = "https://expensable-api.herokuapp.com"

  constructor(
    private http: HttpClient,
  ) { }

  categorias() {
    return this.http.get<Category[]>(`${this.apiUri}/categories`)
  }

  crear_categoria(data: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(`${this.apiUri}/categories`, data, {headers})
  }

}
