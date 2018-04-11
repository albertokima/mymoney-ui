import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { NotAuthenticatedError } from './../seguranca/money-http';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toasty: ToastyService,
    private router: Router,
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);
    } else if (errorResponse instanceof Response
        && errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;
      const status = errorResponse.status;

      msg = 'Ocorreu um erro ao processar a sua solicitação. ';
      try {
        errors = errorResponse.json();
        msg = errors[0].mensagemUsuario;
      } catch (e) {
        if (status === 403) {
          msg = 'Você não tem permissão para executar esta operação!';
        } else if (status === 404) {
          msg += '<span class="text-bold">404 Not Found</span>';
        } else if (status === 415) {
          msg += '<span class="text-bold">415 Unsupported Media Type</span>';
        } else {
          msg += `<span class="text-bold">Código do erro: ${status}</span>`;
        }
      }

      console.error('Ocorreu um erro', errorResponse);
    } else {
      msg = `Erro ao processar serviço remoto. `;
      msg += `<span class="text-bold">Tente novamente</span>`;

      console.error('Ocorreu um erro', errorResponse);
    }

    this.toasty.error(msg);
  }

}
