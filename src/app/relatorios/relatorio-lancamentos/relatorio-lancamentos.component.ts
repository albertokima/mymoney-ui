import { Component, OnInit } from '@angular/core';

import { RelatoriosService } from './../relatorios.service';
import { UtilService } from './../../core/util.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  dataInicio: Date;
  dataFim: Date;
  pt: any;

  constructor(
    private util: UtilService,
    private relatorioService: RelatoriosService,
    private errorHandler: ErrorHandlerService,
  ) {
    this.pt = util.retornaLocalePt();
  }

  ngOnInit() {
  }

  gerar() {
    this.relatorioService.relatorioLancamentosPorPessoa(this.dataInicio, this.dataFim)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
