import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { UtilService } from './../../core/util.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css'],
})
export class LancamentosGridComponent {

  @Input() lancamentos = [];
  @Input() linhas: number;
  @Input() totalRegistros: number;
  @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @ViewChild('tabela') tabela;

  constructor(private util: UtilService) { }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    const campo = event.sortField === undefined ? null : event.sortField;
    const ordem = event.sortOrder;
    const evento = {
      pagina, campo, ordem
    };
    this.onLazyLoad.emit(evento);
  }

  aoExcluir(lancamento: any) {
    this.onDelete.emit(lancamento);
  }

}
