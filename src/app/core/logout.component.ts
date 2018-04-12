import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

import { LogoutService } from './../seguranca/logout.service';
import { ErrorHandlerService } from './error-handler.service';

@Component({
  selector: 'app-logout',
  template: ``,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private logoutService: LogoutService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService
  ) {
  }

  ngOnInit() {
    this.logout();
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
