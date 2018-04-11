import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { Pessoa } from './../../core/models';
import { PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  ufs = [
    {label: 'PR', value: 'PR'},
    {label: 'SP', value: 'SP'},
    {label: 'RJ', value: 'RJ'}
  ];
  pessoa = new Pessoa();
  isOverlayVisible = false;

  constructor(
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private toasty: ToastyService,
    private erroHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];
    if (codigoPessoa) {
      this.buscarPorCodigo(codigoPessoa);
    }
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function(){
      this.pessoa = new Pessoa();
      this.isOverlayVisible = false;
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  get titulo(): string {
    let titulo: string;
    if (this.editando) {
      if (this.isOverlayVisible) {
        titulo = `Pessoa cód.: ${this.pessoa.codigo}`;
      } else {
        titulo = 'Edição de Pessoa';
      }
    } else {
      titulo = 'Nova Pessoa';
    }
    this.title.setTitle(titulo);

    return titulo;
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.cadastrar(form);
    }
  }

  private cadastrar(form: FormControl) {
    this.pessoaService.cadastrar(this.pessoa)
      .then(pessoa => {
        this.toasty.success('Pessoa cadastrada com sucesso!');

        this.pessoa = pessoa;
        this.isOverlayVisible = true;

        // this.router.navigate(['/pessoas', pessoa.codigo]);
      })
      .catch(erro => this.erroHandler.handle(erro));
  }

  private atualizar(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.toasty.success('Pessoa atualizada com sucesso!');
        this.pessoa = pessoa;
      })
      .catch(erro => this.erroHandler.handle(erro));
  }

  private buscarPorCodigo(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
      })
      .catch(erro => this.erroHandler.handle(erro));
  }

}
