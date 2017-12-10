import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Clientes } from "./cliente";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/RX";

@Injectable()
export class CrudClientesService {
	cliente: Clientes[] = [];
	uri = "http://localhost:8080/FarmaciaWS/api/clientes";

	autoIncrement = 1;

    constructor(private http: Http) { 
	}

  getClientes():Observable<Clientes[]> {
	return this.http.get(this.uri)
	.map((res:Response)=>res.json())
	.catch((erro:any) => Observable.throw(erro));
  }

  adicionarCliente(cliente:Clientes):Observable<Clientes>{
	let bodyString = JSON.stringify(cliente);
    let cabecalho = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:cabecalho});
    return this.http.post(this.uri, bodyString, options)
      .map((res:Response) => {})
      .catch((erro:any) => Observable.throw(erro));
  }

  getClientePorCodigo(codigo:number):Observable<Clientes>	{
		//return(this.cliente.find(clientes => clientes.codigo == codigo));
		return this.http.get(this.uri+"/"+codigo)
		.map((res:Response)=>res.json())		
		.catch((erro:any) => Observable.throw(erro));
  }

 /* removerCliente(cliente:Clientes){
  	let indice = this.clientes.indexOf(cliente, 0);
  	if (indice > -1){
  		this.clientes.splice(indice,1);
  	}
  }*/

  removerCliente(codigo){
	 let bodyString = JSON.stringify(codigo);
	 let headers = new Headers({'Content-Type':'application/json'})
	 let options = new RequestOptions({headers:headers});
	 return this.http.delete(this.getClienteUrl(bodyString),options)
	   .map(res => res.json())
	   .catch((error:any)=>Observable.throw(error));
   }

  private getClienteUrl(codigo){
	return this.uri + "/" + codigo;
  }

  atualizaCliente(codigo:number, cliente:Clientes){
  	//let indice = this.clientes.indexOf(this.getClientePorCodigo(codigo),0);
	//this.clientes[indice]=cliente;
	  
	  let bodyString = JSON.stringify(cliente);
	  let headers = new Headers({'Content-Type':'application/json'})
	 let options = new RequestOptions({headers:headers});
	 return this.http.put(this.getClienteUrl(codigo),bodyString,options)
	   .map(res => res.json())
		 .catch((error:any)=>Observable.throw(error));
		 

  }

}
