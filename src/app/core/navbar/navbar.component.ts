import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';

import { UtilService } from './../util.service';
import { LogoutService } from './../../seguranca/logout.service';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  display = false;
  mostrarMenu = false;
  nomeUsuario = 'Convidado';
  menuLancamentos = false;
  menuPessoas = false;
  linkLancamentos = '/';
  linkPessoas = '/';

  constructor(
    private util: UtilService,
    private router: Router,
    private logoutService: LogoutService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.nomeUsuario = this.util.retornaNomeUsuario();
    this.menuLancamentos = this.util.mostraMenuLancamentos();
    this.menuPessoas = this.util.mostraMenuPessoas();
    this.linkLancamentos = this.util.retornaLinkLancamento();
    this.linkPessoas = this.util.retornaLinkPessoa();
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
        this.toasty.success('Você saiu do Sistema!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
