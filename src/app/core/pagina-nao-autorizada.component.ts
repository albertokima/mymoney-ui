import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-autorizada',
  template: `
    <div class="container">
    <h1 [style.color]="'red'">Acesso negado!</h1>
    <button type="button" pButton label="Home" icon="fa fa-home"
      (click)="voltar()"></button>
    </div>
  `,
  styles: []
})
export class PaginaNaoAutorizadaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  voltar() {
    this.router.navigate(['/']);
  }

}
