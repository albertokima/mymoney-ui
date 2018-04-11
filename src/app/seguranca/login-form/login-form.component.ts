import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../auth.service';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private title: Title,
    private toasty: ToastyService,
    private errorHnadler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Login');
  }

  login(email: string, senha: string) {
    this.auth.login(email, senha)
      .then(() => {
        this.router.navigate(['/']);
        this.toasty.info('Bem-vindo ao Sistema!');
      })
      .catch(erro => {
        this.errorHnadler.handle(erro);
      });
  }

}
