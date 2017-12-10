import { Component, OnInit } from '@angular/core';
import { Clientes } from "../cliente";
import { CrudClientesService } from "../crud-clientes.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-tabela-clientes',
  templateUrl: './tabela-clientes.component.html',
  styleUrls: ['./tabela-clientes.component.css']
})
export class TabelaClientesComponent implements OnInit {
  titulo = "Clientes";
  clientes:Clientes[]=[];
  erro:String;
  
  constructor(private servico:CrudClientesService, private router:Router, private rota:ActivatedRoute) { }

  ngOnInit() {
    //this.clientes = this.servico.getClientes();

    this.servico.getClientes().subscribe(
      data => { this.clientes = data; },
      error => { console.log(error); }
    );

  }

  /*remover(cliente:Clientes){
    this.servico.removerCliente(cliente);
  }*/

  remover(codigo:number){
    this.servico.removerCliente(codigo).subscribe(
      data => this.clientes = data,
      error => this.erro = error
    );
    this.router.navigate(['/listaClientes']);

    }

}
