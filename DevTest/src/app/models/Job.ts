export class Job {
  constructor(
    public id: number,
    public nome: string,
    public idUsuario: number,
    public statusJob: string,
    public tipoRecorrencia: string,
    public valorRecorrencia: number,
    public data_criacao: Date
) {

}

}

  