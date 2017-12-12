import { Component, OnInit } from '@angular/core';
import { CrudClientesService } from '../crud-clientes.service';
import { Clientes } from "../cliente";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit {
  erro: any;
	titulo = "Cadastro de Clientes";
	cliente:Clientes;
  codigo: number;
 
  constructor(private servico:CrudClientesService, private router:Router, private rota:ActivatedRoute) { }
  ngOnInit() { 
    this.codigo = this.rota.snapshot.params['cod']; 
    
    if(isNaN(this.codigo)){
      this.cliente = new Clientes();
    } /*else {
      this.cliente = Object.assign({}, this.servico.getClientePorCodigo(this.codigo));       
      console.log("tem codigo " + this.codigo);      
      }*/

      if(!isNaN(this.codigo)) {
        this.servico.getClientePorCodigo(this.codigo).subscribe(
          data => { this.cliente = data; this.router.navigate(['/listaProdutos'])},
          erro => { console.log('ERROR', erro); }
        );
      }

  }

  salvarCliente(){    
    
    if(isNaN(this.codigo)){
      this.servico.adicionarCliente(this.cliente).subscribe(
      cliente => { this.cancelar(); this.router.navigate(['/listaClientes'])},
      erro => { console.log(erro); }
    );
      this.cliente = new Clientes();
      this.router.navigate(['/listaClientes']);
    } else {
      this.servico.atualizaCliente(this.codigo, this.cliente).subscribe(
        cliente =>  this.router.navigate(['/listaClientes']),
        erro =>  console.log(erro));
               
    }
      //this.router.navigate(['/listaClientes']);


//    this.servico.adicionarProduto(this.produto);
//    this.router.navigate(['/listaProdutos']);
  }


  /*atualizarClientes(codigo:number){
    console.log(this.cliente);
      this.servico.atualizaCliente( codigo,this.cliente).subscribe(
        data => this.cliente = data,
        error => this.erro = error
      );
        // this.router.navigate(['/lista1']);
    
    }*/


    cancelar(){
    	this.router.navigate(['/listaClientes']);
    }

}