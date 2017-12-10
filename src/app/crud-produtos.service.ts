import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Produtos } from "./produto";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/RX";

@Injectable()
export class CrudProdutosService {
  produtos: Produtos[] = [];
  uri = "http://localhost:8080/FarmaciaWS/api/produtos";

autoIncrement:number = 1;

  constructor(private http: Http) { }
  getProdutos():Observable<Produtos[]> {
    //return this.produtos;
    return this.http.get(this.uri)
    .map((res:Response)=>res.json())
    .catch((erro:any) => Observable.throw(erro));
  }

  adicionarProduto(produto:Produtos):Observable<Produtos>{
    //produto.codigo=this.autoIncrement++;
    //this.produtos.push(produto);
    let bodyString = JSON.stringify(produto);
    let cabecalho = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:cabecalho});
    return this.http.post(this.uri, bodyString, options)
      .map((res:Response) => {})
      .catch((erro:any) => Observable.throw(erro));
  }

  getProdutoPorCodigo(codigo:number):Observable<Produtos>{
    //return(this.produtos.find(produto => produto.codigo == codigo));
    return this.http.get(this.uri+"/"+codigo)
		.map((res:Response)=>res.json())		
		.catch((erro:any) => Observable.throw(erro));
  }

  private getProdutoUrl(codigo){
    return this.uri + "/" + codigo;
    }

  removerProduto(codigo){
    //let indice = this.produtos.indexOf(produto, 0);
    //if (indice > -1){
      //this.produtos.splice(indice, 1);
      let bodyString = JSON.stringify(codigo);
      let headers = new Headers({'Content-Type':'application/json'})
      let options = new RequestOptions({headers:headers});
      return this.http.delete(this.getProdutoUrl(bodyString),options)
        .map(res => res.json())
        .catch((error:any)=>Observable.throw(error));
    }
  

  atualizaProduto(codigo:number, produto:Produtos){
    //let indice = this.produtos.indexOf(this.getProdutoPorCodigo(codigo), 0);
    //this.produtos[indice] = produto;
    let bodyString = JSON.stringify(produto);
	  let headers = new Headers({'Content-Type':'application/json'})
	 let options = new RequestOptions({headers:headers});
	 return this.http.put(this.getProdutoUrl(codigo),bodyString,options)
	   .map(res => res.json())
		 .catch((error:any)=>Observable.throw(error));
  }

}
