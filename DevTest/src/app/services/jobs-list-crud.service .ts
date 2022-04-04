import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { ErrorHandlerService } from "./error-handler.service";

import { Usuario } from "../models/Usuario";
import { Job } from "../models/Job";
import { Ordernacao } from "../utils/ordenacao.enum";

@Injectable({
  providedIn: "root",
})
export class JobListService {
  private url = "http://localhost:3000/jobs/";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private http: HttpClient
  ) {}

  private readonly total_elem_pag = 3;

  fetchAll(): Observable<Job[]> {
    return this.http
      .get<Job[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched Jobs")),
        catchError(
          this.errorHandlerService.handleError<Job[]>("fetchAll", [])
        )
      );
  }

  post(item: Job): Observable<any> {
    return this.http.post(this.url, item);
}

editar(job: Job): Observable<any> {
  return this.http.put(this.url + job.id,
    job);
}
  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/groceries/${id}`;

    return this.http
      .delete<Usuario>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

  listarId(id: number): Observable<any> {
    return this.http.get(this.url + id);
  }

  numeroPaginas(totalItens: number) {
    return Math.ceil(totalItens / this.total_elem_pag);
  }

  listarPaginado(ordem = Ordernacao.ASC, filtro = "", pagina = 0): Observable<any> {
    const params= `?pag=${pagina}&ordem=${ordem}&filtro-job=${filtro}`;
    return this.http.get(this.url + params);
  }


 
}
