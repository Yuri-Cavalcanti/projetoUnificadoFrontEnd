import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

interface Pessoa{
  id: number,
  nome: string,
  idade:number
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private apiUrl = 'http://localhost:8080/api/';
  private pathGet = 'pegarPessoa';
  private pathAdd = 'guardarPessoa/save';
  private pathDelete = 'pessoa/delete/';

  constructor(private http: HttpClient) { }

  async get() : Promise<Pessoa[]>{ // para API sincrona basta retirar o async do meotdo e o await do codigo
    try{
      const response = await axios.get<Pessoa[]>(this.apiUrl + this.pathGet);
      console.log("Carregadas: ", response.data);
      return response.data;
    }catch (error) {
      console.error("Erro ao buscar :", error);
      throw error;
    }
  }

  async add(nome_cad : string, idade_cad: number): Promise<number> {

    const tarefaPayload = {
      nome:nome_cad,
      idade:idade_cad
    };

    try {
      const response = await axios.post(this.apiUrl + this.pathAdd, tarefaPayload,{headers:{
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
       const response = await axios.delete(this.apiUrl + this.pathDelete + id);
       console.log("Pessoa removida");
       return response.status;
    }catch (error){
       console.error("Erro ao remover: ",id," - ", error);
       throw error;
    }
  }
}
