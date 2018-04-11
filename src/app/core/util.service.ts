import { Injectable } from '@angular/core';

import { AuthService } from './../seguranca/auth.service';

@Injectable()
export class UtilService {

  constructor(private auth: AuthService) { }

  public retornaNomeUsuario() {
    return this.auth.jwtPayload ? this.auth.jwtPayload.nome : 'Convidado';
  }

  public podePesquisarLancamento() {
    return this.auth.temPermissao('ROLE_PESQUISAR_LANCAMENTO');
  }

  public podeCadastrarLancamento() {
    return this.auth.temPermissao('ROLE_CADASTRAR_LANCAMENTO');
  }

  public podeExcluirLancamento() {
    return this.auth.temPermissao('ROLE_REMOVER_LANCAMENTO');
  }

  public podePesquisarPessoa() {
    return this.auth.temPermissao('ROLE_PESQUISAR_PESSOA');
  }

  public podeCadastrarPessoa() {
    return this.auth.temPermissao('ROLE_CADASTRAR_PESSOA');
  }

  public podeExcluirPessoa() {
    return this.auth.temPermissao('ROLE_REMOVER_PESSOA');
  }

  public mostraMenuLancamentos() {
    const roles = ['ROLE_PESQUISAR_LANCAMENTO', 'ROLE_CADASTRAR_LANCAMENTO'];
    return this.auth.temAlgumaPermissao(roles);
  }

  public mostraMenuPessoas() {
    const roles = ['ROLE_PESQUISAR_PESSOA', 'ROLE_CADASTRAR_PESSOA'];
    return this.auth.temAlgumaPermissao(roles);
  }

  public retornaLinkLancamento() {
    if (this.mostraMenuLancamentos) {
      if (this.podePesquisarLancamento()) {
        return '/lancamentos';
      } else if (this.podeCadastrarLancamento()) {
        return '/lancamentos/novo';
      }
    }
    return '/';
  }

  public retornaLinkPessoa() {
    if (this.mostraMenuPessoas) {
      if (this.podePesquisarPessoa()) {
        return '/pessoas';
      } else if (this.podeCadastrarPessoa()) {
        return '/pessoas/nova';
      }
    }
    return '/';
  }

}
