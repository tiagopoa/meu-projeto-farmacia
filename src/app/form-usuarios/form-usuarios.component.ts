import { Component, OnInit } from '@angular/core';
import { CrudUsuariosService } from '../crud-usuarios.service';
import { Usuarios } from "../usuario";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent implements OnInit {
	titulo = "Cadastro de Usuários";
	usuario:Usuarios;
  codigo: number;

  constructor(private servico:CrudUsuariosService, private router:Router, private rota:ActivatedRoute) { }
  ngOnInit() { 
    this.codigo = this.rota.snapshot.params['cod'];

    if(isNaN(this.codigo)){
      this.usuario= new Usuarios();
    } else {
      //this.usuario = Object.assign({},
        //this.servico.getUsuarioPorCodigo(this.codigo));
        this.servico.getUsuarioPorCodigo(this.codigo).subscribe(
          data => { this.usuario = data; },
          //data => window.location.reload(),
          erro => { console.log('ERROR', erro); }
        );
    }

   }

     salvarUsuario(){
    if(isNaN(this.codigo)){
      //this.servico.adicionarUsuario(this.usuario);
      //this.usuario = new Usuarios();
      this.servico.adicionarUsuario(this.usuario).subscribe(
        data => { this.cancelar();  window.location.reload();},
        erro => { console.log(erro); }
      );
    } else {
      //this.servico.atualizaUsuario(this.codigo, this.usuario);
      this.servico.atualizaUsuario(this.codigo, this.usuario).subscribe(
        data => {console.log(data); window.location.reload()}); 
         this.router.navigate(['/listaUsuarios']);
    }
      this.router.navigate(['/listaUsuarios']);
    }

    cancelar(){
    	this.router.navigate(['/listaUsuarios']);
    }

}
