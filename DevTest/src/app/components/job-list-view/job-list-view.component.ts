import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { UsuarioListCrudService } from "src/app/services/usuario-list-crud.service";

import { Usuario } from "src/app/models/Usuario";
import { tap } from "rxjs/operators";
import { Job } from "src/app/models/Job";
import { JobListService } from "src/app/services/jobs-list-crud.service ";
import { Ordernacao } from "src/app/utils/ordenacao.enum";

@Component({
  selector: "app-job-list",
  templateUrl: "./job-list-view.component.html",
  styleUrls: ["./job-list-view.component.css"],
})
export class JobListViewComponent implements OnInit {
  jobs: Job[] = [];
  constructor(private jobListCrudService: JobListService) {}
  ordem: Ordernacao = Ordernacao.ASC;
  filtro: string = '';
  pagina: number = 0;
  currentPage: number = 0;
  totalItens: number = 0;
  
  ngOnInit(): void {
    this.fetchAll();
  }
  paginar($event: any, pagina: number){
    $event.preventDefault();
    this.pagina = pagina;
    this.currentPage = pagina;
    this.fetchAll();
  }

  numeroPaginas() {
    return this.jobListCrudService.numeroPaginas(this.totalItens);
  }

  obterPaginas() {
    return [...Array(this.numeroPaginas()).keys()];
  }

  
  ascendente(){
    return this.ordem === Ordernacao.ASC;
  }

  ordenar(){ 
    if(this.ordem === Ordernacao.ASC){
      this.ordem = Ordernacao.DESC;
    }
    else{
      this.ordem = Ordernacao.ASC;
    }
    this.fetchAll();  
  }

  pesquisar($event: any){
    this.pagina = 0;
    this.filtro = $event.target.value;
    this.fetchAll();  
  }

  fetchAll(){
    this.jobListCrudService.listarPaginado(this.ordem, this.filtro, this.pagina+1).subscribe(
      dados =>{
        this.jobs = dados.jobs;
        this.totalItens = dados.totalItens;
      },
      () => alert("Erro obtendo usuarios.")
    );
  }



  // delete(id: number): void {
  //   this.usuarios$ = this.usuarioListCrudService
  //     .delete(id)
  //     .pipe(tap(() => (this.usuarios$ = this.fetchAll())));
  // }
}
