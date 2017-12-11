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
  erro:String;

  constructor(private servico:CrudUsuariosService) { }

  ngOnInit() {
    //this.usuarios = this.servico.getUsuarios();
    this.servico.getUsuarios().subscribe(
      data => { this.usuarios = data; },
      error => { console.log(error); }
    );
  }

  remover(codigo:number){
    //this.servico.removerUsuario(usuario);
    this.servico.removerUsuario(codigo).subscribe(
      data => this.usuarios = data,
      error => this.erro = error
    );
  }

}
