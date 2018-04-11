import { Title } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { element } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

import { LancamentoService } from './../lancamento.service';
import { LancamentoFiltro } from './../../core/filters';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  @ViewChild('gridLancamentos') grid;

  filtro = new LancamentoFiltro();
  totalRegistros = 0;
  lancamentos = [];

  constructor (
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private confirmService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Lançamentos');
    // this.pesquisar();
  }

  pesquisar(event?: any) {
    if (event) {
      this.filtro.pagina = event.pagina;
      this.filtro.campo = event.campo;
      this.filtro.ordem = event.ordem;
    } else {
      this.filtro.pagina = 0;
    }

    this.lancamentoService.pesquisar( this.filtro )
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;

        if (this.filtro.pagina === 0) {
          this.grid.tabela.first = 0;
        }
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  confirmarExclusao(lancamento: any) {
    this.confirmService.confirm({
      message: 'Deseja realmente excluir o lançamento?',
      accept: () => this.excluir(lancamento)
    });
  }

  private excluir(lancamento: any) {
    if (lancamento) {
      this.lancamentoService.excluir(lancamento.codigo)
        .then(() => {
          if (this.grid.tabela.first === 0) {
            this.pesquisar();
          } else {
            this.grid.tabela.first = 0;
          }

          this.toastyService.success('Lançamento excluído com sucesso!');
          // this.lancamentos = this.lancamentos.filter(item => item !== lancamento);
          // if (this.lancamentos.length === 0) {
          //  this.grid.tabela.first = 0 // reload grid content
          // }
        })
        .catch((erro) => this.errorHandler.handle(erro));
      }
  }

}

