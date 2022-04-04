import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UsuarioListCrudService } from "src/app/services/usuario-list-crud.service";

import { Usuario } from "src/app/models/Usuario";
import { tap } from "rxjs/operators";
import { Ordernacao } from "src/app/utils/ordenacao.enum";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list-view.component.html",
  styleUrls: ["./user-list-view.component.css"],
})
export class UserListViewComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuarioListCrudService: UsuarioListCrudService) {}

  ordem: Ordernacao = Ordernacao.ASC;
  ordemData: Ordernacao | undefined;
  filtro: string = '';
  pagina: number = 0;
  currentPage: number = 0;
  totalItens: number = 0;
  ordemDataOrUser = 1;

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
    return this.usuarioListCrudService.numeroPaginas(this.totalItens);
  }

  obterPaginas() {
    return [...Array(this.numeroPaginas()).keys()];
  }

  ordenar(){ 
      this.ordemDataOrUser = 1;
      if(this.ordem === Ordernacao.ASC){
        this.ordem = Ordernacao.DESC;
      }
      else{
        this.ordem = Ordernacao.ASC;
      }
      this.fetchAll(); 
    
  }

  ordenarData(){ 
    this.ordemDataOrUser = 0;
    if(this.ordemData === Ordernacao.ASC){
      this.ordemData = Ordernacao.DESC;
    }
    else{
      this.ordemData = Ordernacao.ASC;
    }
    this.fetchAll();  
  }


  private fetchAll(){
    this.usuarioListCrudService.listarPaginado(this.ordem, this.ordemData, this.filtro, this.pagina+1, this.ordemDataOrUser).subscribe(
      dados =>{
        this.usuarios = dados.users;
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
  ascendente(){
    return this.ordem === Ordernacao.ASC;
  }

  pesquisar($event: any){
    this.pagina = 0;
    this.filtro = $event.target.value;
    this.fetchAll();  
  }

  listarId($event: any, userId: number) {
    $event.preventDefault();
    this.usuarioListCrudService.listarId(userId).subscribe(
      (      usuario: any) => {
        this.usuarios = usuario;
      },
      () => alert('Erro obtendo tarefa')
    );
  }

}
