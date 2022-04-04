import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { ErrorHandlerService } from "./error-handler.service";

import { Usuario } from "../models/Usuario";
import { Ordernacao } from "../utils/ordenacao.enum";

@Injectable({
  providedIn: "root",
})
export class UsuarioListCrudService {
  private url = "http://localhost:3000/usuario/";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  private readonly total_elem_pag = 3;

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private http: HttpClient
  ) {}
  
  listarId(id: number): Observable<any> {
    return this.http.get(this.url + id);
  }
  
  listarPaginado(ordem = Ordernacao.ASC, ordemData= "", filtro = "", pagina = 0, ordemUserOrData = 1): Observable<any> {
    const params= `?pag=${pagina}&ordem=${ordem}&ordemData=${ordemData}&filtro-usuario=${filtro}&ordemUserOrData=${ordemUserOrData}`;
    return this.http.get(this.url + params);
  }

  editar(usuario: Usuario): Observable<any> {
    return this.http.put(this.url + usuario.id,
      usuario);
  }

  numeroPaginas(totalItens: number) {
    return Math.ceil(totalItens / this.total_elem_pag);
  }

  update(grocery: Usuario): Observable<any> {
    return this.http
      .put<Usuario>(this.url, grocery, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }


    fetchAll(): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched Usuarios")),
        catchError(
          this.errorHandlerService.handleError<Usuario[]>("fetchAll", [])
        )
      );
  }

  post(item: Usuario): Observable<any> {
      return this.http.post(this.url, item);
  }


  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/usuarios/${id}`;

    return this.http
      .delete<Usuario>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }
}
