import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';

import { UtilService } from './../../core/util.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css'],
})
export class PessoasGridComponent {

  @Input() pessoas = [];
  @Input() itensPorLinha: number;
  @Input() totalRegistros: number;
  @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onChangeStatus: EventEmitter<any> = new EventEmitter();

  @ViewChild('tabela') tabela;

  constructor(private util: UtilService) { }

  aoCarregar(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    const campo = event.sortField === undefined ? null : event.sortField;
    const ordem = event.sortOrder;
    const evento = {
      pagina, campo, ordem
    };
    this.onLazyLoad.emit(evento);
  }

  private getEstilosAtivo(ativo: boolean) {
    return {
      color: 'white',
      textDecoration: 'none',
      backgroundColor: ativo ? '#5cb85c' : '#d9534f',
      padding: '2px 12px',
      textAlign: 'center',
      display: 'inline-block',
      borderRadius: '1em'
    }
  }

  aoExcluir(pessoa: any) {
    this.onDelete.emit(pessoa);
  }

  // para ancora(<a>) importante ter retorno void explicito
  aoMudarStatus(pessoa) {
    this.onChangeStatus.emit(pessoa);
  }

}
