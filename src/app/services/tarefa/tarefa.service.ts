import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

interface Pessoa{
  id: number,
  nome: string
}

interface Tarefa {
  id: number;
  pessoa: Pessoa;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private apiUrl = 'http://localhost:8080/api/';
  private pathGet = 'pegarTarefa';
  private pathAdd = 'guardarTarefa/save';
  private pathDelete = 'tarefa/delete/';

  constructor(private http: HttpClient) {}

  async get() : Promise<Tarefa[]>{ // para API sincrona basta retirar o async do meotdo e o await do codigo
    try{
      const response = await axios.get<Tarefa[]>(this.apiUrl + this.pathGet);
      console.log("Carregadas: ", response.data);
      return response.data;
    }catch (error) {
      console.error("Erro ao buscar :", error);
      throw error;
    }
  }

  async addTarefa(idPessoa : number, descricao : string): Promise<number> {

    const tarefaPayload = {
      id_pessoa: idPessoa,
      descricao: descricao // Descrição passada como parâmetro
    };

    try {
      const response = await axios.post(this.apiUrl + this.pathAdd, tarefaPayload,{headers:{
        'content-type':'application/json'
      }});
      console.log("Tarefa adicionada:", response.data);
      return response.status;
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      throw error;
    }
  }

  async deleteTarefa(id: number) : Promise<number>{
    try{
       const response = await axios.delete(this.apiUrl + this.pathDelete + id);
       console.log("Tarefa removida");
       return response.status;
    }catch (error){
       console.error("Erro ao remover: ",id," - ", error);
       throw error;
    }
  }

  /*get(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl + this.pathGet);
  }

  addTarefa(tarefa: Omit<Tarefa, 'id'>): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, tarefa);
  }

  deleteTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }*/
}
