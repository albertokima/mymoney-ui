import { JwtHelper } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

@Injectable()
export class AuthService {

  private oauthTokenUrl: string;
  jwtPayload: any;

  constructor(
    private http: Http,
    private jwtHelper: JwtHelper
  ) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.carregarToken();
  }

  login(email: string, senha: string): Promise<void> {
    const headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = `username=${email}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token)
      })
      .catch(response => {
        if (response.status === 400) {
          const json = response.json();
          if (json.error === 'invalid_grant') {
            return Promise.reject('Usuário e/ou senha inválidos!');
          }
        }
        return Promise.reject(response);
      });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        console.log('Novo Token obtido com sucesso!');

        this.armazenarToken(response.json().access_token)

        return Promise.resolve(null);
      })
      .catch(response => {
        console.log('Erro ao obter novo Token', response);

        return Promise.resolve(null);
      });
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('mytoken', token);
  }

  protected carregarToken() {
    const token = localStorage.getItem('mytoken');
    if (token) {
      this.armazenarToken(token);
    }
  }

  public limparToken() {
    localStorage.removeItem('mytoken');
    this.jwtPayload = null;
  }

  temPermissao(permissao: string): boolean {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temAlgumaPermissao(roles): boolean {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  isAccessTokenInvalido(): boolean {
    const token = localStorage.getItem('mytoken');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

}
