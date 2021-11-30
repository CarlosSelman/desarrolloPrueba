import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario.modelo';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { GLOBAL } from "./global.service";
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: String;
  public identidad: any;
  public token: any;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  crearUsuario(usuario: Usuario):Observable<any>{
    let params = JSON.stringify(usuario);

    return this._http.post(this.url + '/crearUsuario/', params,{headers: this.headersVariable})
  }

  obtenerUsuarios(): Observable<any>{
    return this._http.get(this.url + '/obtenerUsuarios', {headers: this.headersVariable});
  }

  obtenerUsuariosD(): Observable<any>{
    return this._http.get(this.url + '/obtenerUsuariosD', {headers: this.headersVariable});
  }

  obtenerUsuarioId(id:String): Observable<any>{
    return this._http.get(this.url + '/obtenerUsuario/'+ id, {headers: this.headersVariable})
  }

  editarUsuario(usuario: Usuario): Observable<any>{
    let params = JSON.stringify(usuario);
    return this._http.put(this.url + '/editarUsuario/'+ usuario._id, params, {headers: this.headersVariable})
  }

  eliminarUsuario(id:String): Observable<any>{
    return this._http.delete(this.url + '/eliminarUsuario/'+ id, {headers: this.headersVariable})
  }
}