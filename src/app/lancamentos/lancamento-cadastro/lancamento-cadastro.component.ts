import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/models';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  categorias = [];
  pessoas = [];
  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  valor: number;
  lancamento = new Lancamento();
  isOverlayVisible = false;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get titulo(): string {
    let titulo: string;
    if (this.editando) {
      if (this.isOverlayVisible) {
        titulo = `Lançamento nr.: ${this.lancamento.codigo}`;
      } else {
        titulo = 'Edição de Lançamento';
      }
    } else {
      titulo = 'Novo Lançamento';
    }
    this.title.setTitle(titulo);

    return titulo;
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  private carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function(){
      this.lancamento = new Lancamento();
      this.isOverlayVisible = false;
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.cadastrar(form);
    }
  }

  private cadastrar(form: FormControl) {
    this.lancamentoService.cadastrar(this.lancamento)
    .then((lancamento) => {
      this.toasty.success('Lançamento cadastrado com sucesso!');
      this.lancamento = lancamento;

      this.isOverlayVisible = true;
      // this.router.navigate(['/lancamentos', lancamento.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  private atualizar(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
    .then((lancamento) => {
      this.toasty.success('Lançamento atualizado com sucesso!');
      this.lancamento = lancamento;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  private carregarCategorias() {
    this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(
          c => ({label: c.nome, value: c.codigo})
        )
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(
          c => ({label: c.nome, value: c.codigo})
        )
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
