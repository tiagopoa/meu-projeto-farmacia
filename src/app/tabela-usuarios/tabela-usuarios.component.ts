import { Component, OnInit } from '@angular/core';
import { Usuarios } from "../usuario";
import { CrudUsuariosService } from "../crud-usuarios.service";

@Component({
  selector: 'app-tabela-usuarios',
  templateUrl: './tabela-usuarios.component.html',
  styleUrls: ['./tabela-usuarios.component.css']
})
export class TabelaUsuariosComponent implements OnInit {
	titulo = "Usuários"
	usuarios: Usuarios[]=[];

  constructor(private servico:CrudUsuariosService) { }

  ngOnInit() {
  	this.usuarios = this.servico.getUsuarios();
  }

  remover(usuario:Usuarios){
  	this.servico.removerUsuario(usuario);
  }

}
