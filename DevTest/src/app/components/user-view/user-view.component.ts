import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioListCrudService } from 'src/app/services/usuario-list-crud.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  usuarios$: Observable<Usuario[]> | undefined;

  constructor(private usuarioListCrudService: UsuarioListCrudService) { }

  ngOnInit(): void {
    this.fetchAll();
    this.usuarios$ = this.fetchAll();
  }

  fetchAll(): Observable<Usuario[]> {
    return this.usuarioListCrudService.fetchAll();
  }
 post(nome: string, senha: string, telefone: string, email: string ): void {

    const telefone2 = parseInt(telefone);
    const newUsuario: Usuario = {
      id: 0,
      nome: nome,
      email: email,
      telefone: telefone2,
      senha: senha,
      data_criacao: new Date
    };
    
  this.usuarioListCrudService
      .post(newUsuario).subscribe(
        () => alert("Adicionado com sucesso."),
        () => alert("Erro ao adicionar.")
      );
  }

}
