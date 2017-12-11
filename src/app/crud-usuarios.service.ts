import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Usuarios } from "./usuario";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/RX";

@Injectable()
export class CrudUsuariosService {

	//cosnt pgp = require('pg-promise')();
	//const db = pgp('postgres://postgres@localhost:5432/example');
	uri = "http://localhost:8080/FarmaciaWS/api/usuarios";

	usuarios: Usuarios[] = [];

	autoIncrement = 1;

  constructor(private http: Http) { }
  getUsuarios():Observable<Usuarios[]> {
	  //return this.usuarios;
	  return this.http.get(this.uri)
	  .map((res:Response)=>res.json())
	  .catch((erro:any) => Observable.throw(erro));
  }



  /*adicionarUsuario(usuario:Usuarios){
  	usuario.codigo=this.autoIncrement++;
  	this.usuarios.push(usuario);
  }*/

  adicionarUsuario(usuario:Usuarios):Observable<Usuarios>{    
    let bodyString = JSON.stringify(usuario);
    let cabecalho = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:cabecalho});
    return this.http.post(this.uri, bodyString, options)
      .map((res:Response) => {})
      .catch((erro:any) => Observable.throw(erro));
  }

  /*getUsuarioPorCodigo(codigo:number){
  	return(this.usuarios.find(usuario => usuario.codigo == codigo));
  }*/

  getUsuarioPorCodigo(codigo:number):Observable<Usuarios>{
    //return(this.produtos.find(produto => produto.codigo == codigo));
    return this.http.get(this.uri+"/"+codigo)
		.map((res:Response)=>res.json())		
		.catch((erro:any) => Observable.throw(erro));
  }

  private getUsuarioUrl(codigo){
    return this.uri + "/" + codigo;
    }

  /*removerUsuario(usuario:Usuarios){
  	let indice = this.usuarios.indexOf(usuario, 0);
  	if (indice > -1){
  		this.usuarios.splice(indice,1);
  	}
  }*/

  removerUsuario(codigo){
      let bodyString = JSON.stringify(codigo);
      let headers = new Headers({'Content-Type':'application/json'})
      let options = new RequestOptions({headers:headers});
      return this.http.delete(this.getUsuarioUrl(bodyString),options)
        .map(res => res.json())
        .catch((error:any)=>Observable.throw(error));
    }

 /* atualizaUsuario(codigo:number, usuario:Usuarios){
  	let indice = this.usuarios.indexOf(this.getUsuarioPorCodigo(codigo),0);
  	this.usuarios[indice]=usuario;
  }*/

  atualizaUsuario(codigo:number, usuario:Usuarios){
    let bodyString = JSON.stringify(usuario);
	  let headers = new Headers({'Content-Type':'application/json'})
	 let options = new RequestOptions({headers:headers});
	 return this.http.put(this.getUsuarioUrl(codigo),bodyString,options)
	   .map(res => res.json())
		 .catch((error:any)=>Observable.throw(error));
  }

}
