import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { AuthHttp } from 'angular2-jwt';

import { LancamentoFiltro } from './../core/filters';
import { Lancamento } from './../core/models';
import { environment } from 'environments/environment';

@Injectable()
export class LancamentoService {

  private lancamentosUrl: string;

  constructor(private http: AuthHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    if (filtro.descricao) {
      params.append('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoDe) {
      params.append('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }
    if (filtro.dataVencimentoAte) {
      params.append('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }
    if (filtro.campo) {
      const ordem = filtro.ordem === 1 ? 'asc' : 'desc';
      params.append('sort', `${filtro.campo},${ordem}`);
    }

    params.append('page', filtro.pagina.toString());
    params.append('size', filtro.linhas.toString());

    return this.http.get(`${this.lancamentosUrl}?resumo`, { params })
            .toPromise()
            .then(response => {
              const json = response.json();
              const lancamentos = json.content;
              const resultado = {
                lancamentos,
                total: json.totalElements
              }

              return resultado;
            });
  }

  excluir(codigo: any): Promise<null> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  cadastrar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento))
      .toPromise()
      .then(response => {
        const lancamentoNovo = response.json() as Lancamento;
        this.converterStringsParaDatas([lancamentoNovo]);

        return lancamentoNovo;
      });
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put(
        `${this.lancamentosUrl}/${lancamento.codigo}`, JSON.stringify(lancamento))
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;
        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;
        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      if (lancamento.dataVencimento) {
        lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();
      }

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }

}
