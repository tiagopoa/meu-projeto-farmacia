import { Injectable } from '@angular/core';
import { Usuarios } from "./usuario";

@Injectable()
export class CrudUsuariosService {

	//cosnt pgp = require('pg-promise')();
	//const db = pgp('postgres://postgres@localhost:5432/example');

	usuarios: Usuarios[] = [];

	autoIncrement = 1;

  constructor() { }
  getUsuarios() {
  	return this.usuarios;
  }



  adicionarUsuario(usuario:Usuarios){
  	usuario.codigo=this.autoIncrement++;
  	this.usuarios.push(usuario);
  }

  getUsuarioPorCodigo(codigo:number){
  	return(this.usuarios.find(usuario => usuario.codigo == codigo));
  }

  removerUsuario(usuario:Usuarios){
  	let indice = this.usuarios.indexOf(usuario, 0);
  	if (indice > -1){
  		this.usuarios.splice(indice,1);
  	}
  }

  atualizaUsuario(codigo:number, usuario:Usuarios){
  	let indice = this.usuarios.indexOf(this.getUsuarioPorCodigo(codigo),0);
  	this.usuarios[indice]=usuario;
  }

}
