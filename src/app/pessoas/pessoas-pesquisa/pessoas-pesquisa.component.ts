import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Component, OnInit, ViewChild } from '@angular/core';

import { PessoaService } from './../pessoa.service';
import { PessoaFiltro } from './../../core/filters';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  @ViewChild('gridPessoas') grid;

  filtro = new PessoaFiltro();
  pessoas = [];
  totalRegistros: number;

  constructor(
    private pessoaService: PessoaService,
    private confirmService: ConfirmationService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Pessoas');
    // this.pesquisar();
  }

  pesquisar(evento?: any) {
    if (evento) {
      this.filtro.pagina = evento.pagina;
      this.filtro.campo = evento.campo;
      this.filtro.ordem = evento.ordem;
    } else {
      this.filtro.pagina = 0;
    }

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.totalRegistros = resultado.total;

        if (this.filtro.pagina === 0) {
          this.grid.tabela.first = 0;
        }
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  listarTodas() {
    this.pessoaService.listarTodas()
      .then(pessoas => this.pessoas = pessoas);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmService.confirm({
      message: 'Deseja realmente excluir a Pessoa?',
      accept: () => { this.excluir(pessoa) }
    });
  }

  private excluir(pessoa: any) {
    if (pessoa) {
      this.pessoaService.excluir(pessoa.codigo)
        .then(() => {
          if (this.grid.tabela.first === 0) {
            this.pesquisar();
          } else {
            this.grid.tabela.first = 0;
          }
          this.toasty.success('Pessoa excluída com sucesso!');
        })
        .catch((erro) => this.errorHandler.handle(erro));
    }
  }

  confirmarAlteracao(pessoa: any) {
    const status = pessoa.ativo ? 'inativar' : 'ativar';
    this.confirmService.confirm({
      message: `Deseja realmente ${status} a Pessoa?`,
      accept: () => { this.mudarStatus(pessoa) }
    });
  }

  private mudarStatus(pessoa: any) {
    if (pessoa) {
      const status = !pessoa.ativo;
      this.pessoaService.mudarStatus(pessoa.codigo, status)
        .then(() => {
          const ativo = status ? 'ativada' : 'inativada';

          pessoa.ativo = status;
          this.toasty.success(`Pessoa ${ativo} com sucesso!`);
        })
        .catch((erro) => this.errorHandler.handle(erro));
    }
  }

}
