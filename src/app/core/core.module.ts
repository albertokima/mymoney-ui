import { AuthService } from './../seguranca/auth.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import localePt from '@angular/common/locales/pt';

import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastyModule } from 'ng2-toasty';
import { JwtHelper } from 'angular2-jwt';

import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { PaginaNaoAutorizadaComponent } from './pagina-nao-autorizada.component';

import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { CategoriaService } from './../categorias/categoria.service';
import { ErrorHandlerService } from './error-handler.service';
import { Title } from '@angular/platform-browser';
import { UtilService } from './util.service';
import { LogoutComponent } from './logout.component';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    SidebarModule,
    ConfirmDialogModule,
    RouterModule,
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    PaginaNaoAutorizadaComponent,
    LogoutComponent
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule,
  ],
  providers: [
    PessoaService,
    LancamentoService,
    CategoriaService,
    ErrorHandlerService,
    AuthService,
    UtilService,
    JwtHelper,

    Title,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
