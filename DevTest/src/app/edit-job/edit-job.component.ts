import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { UsuarioListCrudService } from '../services/usuario-list-crud.service';
import { Observable, of } from 'rxjs';
import { Job } from '../models/Job';
import { JobListService } from '../services/jobs-list-crud.service ';


@Component({
  selector: 'app-editar',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {
  form: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(5)]],
    status: ['', [Validators.required, Validators.minLength(5)]],
    tipo: ['', [Validators.required, Validators.minLength(5)]]
  });

  test: Boolean | undefined;

  
  erro: boolean = false;
  processando: boolean = true;
  job: Job = new Job(1, 'aaaa', 1,"",'', 1, new Date);
  constructor(private route: ActivatedRoute, private service: JobListService, private fb: FormBuilder) { }
  

  ngOnInit(): void {
    const jobId = this.route.snapshot.params['id'];
    this.service.listarId(jobId).subscribe(
      job => {
        this.job = job[0];
        this.form.controls['nome'].setValue(this.job.nome);
        this.form.controls['status'].setValue(this.job.statusJob);
        this.form.controls['tipo'].setValue(this.job.tipoRecorrencia);
      },
      () => alert("Erro obtendo Job")
    );
   
  }

  editar() {
    if (this.form.invalid) {
      return;
    }
    this.job.nome = this.form.value.nome;
    this.job.statusJob = this.form.value.status;
    this.job.tipoRecorrencia = this.form.value.tipo;
    this.processando = true;
    
    this.service.editar(this.job).subscribe(
      () => {
        this.erro = false;
        this.processando = false;
        alert("Job atualizado com sucesso.")
      }, //sucesso
      () => {
        this.erro = true;
        this.processando = false;
        alert("Erro ao realizar atualização.")
      } //erro
    );
  }

}