import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
    <div class="container">
      <h1>Página não encontrada</h1>
      <button type="button" pButton label="Voltar" icon="fa fa-arrow-left"
        (click)="voltar()"></button>
    </div>
  `,
  styles: []
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  voltar() {
    this.location.back();
  }

}
