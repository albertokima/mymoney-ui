import { Contato } from './../../core/models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos: Array<Contato>;
  contato: Contato;
  showDialog: boolean;
  ccRegex: RegExp = /\(\d{2}\) \d{4,5}\-\d{3,4}$/;
  indice: number;

  constructor() { }

  ngOnInit() {
    this.showDialog = false;
  }

  get editando() {
    return this.contato && this.contato.codigo;
  }

  novoContato() {
    this.showDialog = true;
    this.contato = new Contato();
    this.indice = this.contatos.length;
  }

  editarContato(contato, index) {
    this.showDialog = true;
    this.contato = Object.assign({}, contato);
    this.indice = index;
  }

  removerContato(index) {
    this.contatos.splice(index, 1);
  }

  confirmar() {
    this.showDialog = false;

    if (this.contato.telefone.length === 14) {
      let telefone = this.contato.telefone.replace('-', '');
      telefone = `${telefone.substr(0, 9)}-${telefone.substr(9)}`;
      this.contato.telefone = telefone;
    }

    const contato = Object.assign({}, this.contato);
    this.contatos[this.indice] = contato;
  }

}
