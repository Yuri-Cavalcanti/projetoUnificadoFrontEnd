import { Component, OnInit } from '@angular/core';
import { TarefaService } from '../../services/tarefa/tarefa.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

interface Pessoa{
  id: number,
  nome: string
}

interface Tarefa {
  id: number;
  pessoa: Pessoa;
  descricao: string;
}

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {
  tarefas: Tarefa[] = [];
  dono: number = 0;
  descricao: string = '';
  displayedColumns: string[] = ['id', 'pessoa', 'descricao', 'acoes'];
  modalVisivel: boolean = false;
  erro = false;
  mensagemErro = '';

  constructor(private tarefaService: TarefaService, public dialog: MatDialog) {}

  ngOnInit() {
    this.carregarTarefas();
  }

  async carregarTarefas() {
    this.tarefas = await this.tarefaService.get();
  }

  async adicionarTarefa() {
    if (!this.dono || !this.descricao) return;
    const result = await this.tarefaService.addTarefa(this.dono, this.descricao);
    this.carregarTarefas();
    this.limparCampos();
    this.modalVisivel = false;
  }

  confirmarRemocao(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data:{
        mensagem:'Tem certeza que deseja remover a tarefa?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removerTarefa(id);
      }
    });
  }

  async removerTarefa(id: number) {
    await this.tarefaService.deleteTarefa(id);
    this.carregarTarefas();
  }

  atualizarTarefas() {
    console.log("🔃 Atualizando tarefas manualmente...");
    this.carregarTarefas();
  }

  abrirModal() {
    this.modalVisivel = true;
  }

  // Fechar o modal
  fecharModal() {
    this.modalVisivel = false;
  }

  limparCampos() {
    this.dono = 0;
    this.descricao = '';
  }
}
