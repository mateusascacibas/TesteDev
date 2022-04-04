import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { UsuarioListCrudService } from '../services/usuario-list-crud.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-editar',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  form: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.minLength(5)]],
    telefone: ['', [Validators.required, Validators.minLength(5)]],
    senha: ['', [Validators.required, Validators.minLength(5)]]
  });


  
  erro: boolean = false;
  processando: boolean = true;
  userId!: number;
  user: Usuario = new Usuario(1, 'aaaa', '',1,'', new Date)|| [];
  name: String | undefined;
  constructor(private route: ActivatedRoute, private service: UsuarioListCrudService, private fb: FormBuilder) { }
  

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.service.listarId(this.userId).subscribe(
      user => {
        this.user = user[0];
        this.form.controls['nome'].setValue(this.user.nome);
        this.form.controls['email'].setValue(this.user.email);
        this.form.controls['telefone'].setValue(this.user.telefone);
        this.form.controls['senha'].setValue(this.user.senha);
        
      },
      () => alert("Erro obtendo nome")
    );
   
  }

  editar() {
    if (this.form.invalid) {
      return;
    }
    this.user.nome = this.form.value.nome;
    this.user.email = this.form.value.email;
    this.user.telefone = this.form.value.telefone;
    this.user.senha = this.form.value.senha;
    this.processando = true;
    this.service.editar(this.user).subscribe(
      () => {
        this.erro = false;
        this.processando = false;
        alert("Atualização feita com sucesso.")
      }, //sucesso
      () => {
        this.erro = true;
        this.processando = false;
        alert("Erro ao realizar atualização.")
      } //erro
    );
  }

}