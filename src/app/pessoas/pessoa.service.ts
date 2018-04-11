import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { AuthHttp } from 'angular2-jwt';

import { PessoaFiltro } from './../core/filters';
import { Pessoa } from './../core/models';
import { environment } from 'environments/environment';

@Injectable()
export class PessoaService {

  private pessoasUrl: string;

  constructor(private http: AuthHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();

    if (filtro.nome) {
      params.append('nome', filtro.nome);
    }
    if (filtro.campo) {
      const ordem = filtro.ordem === 1 ? 'asc' : 'desc';
      params.append('sort', `${filtro.campo},${ordem}`);
    }
    params.append('page', filtro.pagina.toString());
    params.append('size', filtro.linhas.toString());

    return this.http.get(this.pessoasUrl, { params })
            .toPromise()
            .then(response => {
              const json = response.json();
              const pessoas = json.content;
              const resultado = {
                pessoas,
                total: json.totalElements
              }
              return resultado;
            });
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoasUrl)
            .toPromise()
            .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<null> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
            .toPromise()
            .then(() => null);
  }

  mudarStatus(codigo: number, status: boolean): Promise<null> {
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, status)
            .toPromise()
            .then(() => null);
  }

  cadastrar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
            .toPromise()
            .then(response => response.json());
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa))
            .toPromise()
            .then(response => response.json());
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${codigo}`)
            .toPromise()
            .then(response => response.json());
  }

}
