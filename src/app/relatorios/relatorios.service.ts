import { Injectable } from '@angular/core';
import { ResponseContentType, URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';
import * as moment from 'moment';

@Injectable()
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(private http: AuthHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    const params = new URLSearchParams();
    params.append('inicio', moment(inicio).format('YYYY-MM-DD'));
    params.append('fim', moment(fim).format('YYYY-MM-DD'));

    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`,
        { params, responseType: ResponseContentType.Blob })
      .toPromise()
      .then(response => response.blob());
  }

}
