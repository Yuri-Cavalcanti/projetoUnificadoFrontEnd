import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from '../axios-config';

interface Pessoa{
  id: number,
  nome: string,
  idade:number
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private pathGet = 'pegarPessoa';
  private pathAdd = 'guardarPessoa/save';
  private pathDelete = 'pessoa/delete/';

  constructor(private http: HttpClient) { }

  async get() : Promise<Pessoa[]>{ // para API sincrona basta retirar o async do meotdo e o await do codigo
      const response = await api.get(this.pathGet);
      console.log("Carregadas: ", response.data);
      return response.data;
  }

  async add(nome_cad : string, idade_cad: number): Promise<number> {

    const tarefaPayload = {
      nome:nome_cad,
      idade:idade_cad
    };

    try {
      const response = await api.post(this.pathAdd, tarefaPayload,{headers:{
        'content-type':'application/json'
      }});
      console.log("Pessoa adicionada:", response.data);
      return response.status;
    } catch (error) {
      console.error("Erro ao adicionar pessoa:", error);
      throw error;
    }
  }

  async delete(id: number) : Promise<number>{
    try{
       const response = await api.delete(this.pathDelete + id);
       console.log("Pessoa removida");
       return response.status;
    }catch (error){
       console.error("Erro ao remover: ",id," - ", error);
       throw error;
    }
  }
}
