import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Job } from 'src/app/models/Job';
import { Usuario } from 'src/app/models/Usuario';
import { JobListService } from 'src/app/services/jobs-list-crud.service ';
import { UsuarioListCrudService } from 'src/app/services/usuario-list-crud.service';
import { Ordernacao } from 'src/app/utils/ordenacao.enum';

@Component({
  selector: 'app-user-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css']
})
export class JobViewComponent implements OnInit {

  usuarios: Usuario[] = [];
  constructor(private jobListService: JobListService, private userListService: UsuarioListCrudService) { }

  ordem: Ordernacao = Ordernacao.ASC;
  ordemData: Ordernacao | undefined;
  filtro: string = '';
  pagina: number = 0;
  currentPage: number = 0;
  totalItens: number = 0;
  ordemDataOrUser = 1;

  ngOnInit(): void {
    this.fetchUser();
  }


  private fetchUser(){
    this.userListService.listarPaginado(this.ordem = Ordernacao.ASC, this.ordemData, this.filtro, this.pagina+1, this.ordemDataOrUser).subscribe(
      dados =>{
        this.usuarios = dados.users;
        this.totalItens = dados.totalItens;
      },
      () => alert("Erro obtendo usuarios.")
    );
  }

 post(nome: string, user: string, tipoRecor: string, status: string, valor: string ): void {

    const id2 = 0;
    const value2 = parseFloat(valor);
    const user2 = parseInt(user);
    const newJob: Job = {
      id: id2,
      nome: nome,
      idUsuario: user2,
      tipoRecorrencia: tipoRecor,
      statusJob: status,
      valorRecorrencia: value2,
      data_criacao: new Date
    };
    
  this.jobListService
      .post(newJob).subscribe(
        () => alert("Adicionado com sucesso."),
        () => alert("Erro ao adicionar.")
      );
  }

}
