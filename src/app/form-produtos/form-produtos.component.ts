import { Component, OnInit } from '@angular/core';
import { CrudProdutosService } from '../crud-produtos.service';
import { Produtos } from "../produto";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-form-produtos',
  templateUrl: './form-produtos.component.html',
  styleUrls: ['./form-produtos.component.css']
})
export class FormProdutosComponent implements OnInit {
  titulo = "Cadastro de Produtos";
  produto:Produtos;
  codigo: number;

  constructor(private servico:CrudProdutosService, private router:Router, private rota:ActivatedRoute) { }
  //ngOnInit() { this.produto = new Produtos(); }

  ngOnInit() { 
    this.codigo = this.rota.snapshot.params['cod']; 

    if(isNaN(this.codigo)){
      this.produto= new Produtos();
    } else {
      
        this.servico.getProdutoPorCodigo(this.codigo).subscribe(
          data => { this.produto = data; },
          erro => { console.log('ERROR', erro); }
        );
      
    }

    /*if(!isNaN(this.codigo)) {
      this.servico.getProdutoPorCodigo(this.codigo).subscribe(
        data => { this.produto = data; },
        erro => { console.log('ERROR', erro); }
      );
    }*/

}

  salvarProduto(){
    if(isNaN(this.codigo)){
      //this.servico.adicionarProduto(this.produto);
      //this.produto = new Produtos();
      this.servico.adicionarProduto(this.produto).subscribe(
        data => { this.cancelar(); window.location.reload();},
        erro => { console.log(erro); }
      );
        //this.servico.adicionarCliente(this.cliente);
        this.produto = new Produtos();
        this.router.navigate(['/listaProdutos']);
    } else {
      //this.servico.atualizaProduto(this.codigo, this.produto);
      this.servico.atualizaProduto(this.codigo, this.produto).subscribe(
        data => { console.log(data); window.location.reload()}); 
         this.router.navigate(['/listaProdutos']);
    }
      this.router.navigate(['/listaProdutos']);


//    this.servico.adicionarProduto(this.produto);
//    this.router.navigate(['/listaProdutos']);
  }

  cancelar(){ this.router.navigate(['/listaProdutos']); }

}
