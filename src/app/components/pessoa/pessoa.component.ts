import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../services/pessoa/pessoa.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

interface Pessoa{
  id: number,
  nome: string,
  idade:number
}

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit{
  pessoas : Pessoa[] = [];
  nome: string = '';
  idade: number = 0;
  displayedColumns = ['id', 'nome', 'idade', 'acoes']
  modalVisivel = false;
  

  constructor(private pessoaService: PessoaService, public dialog: MatDialog) {}

  ngOnInit() {
    this.carregarPessoas();
  }

  async carregarPessoas() {
    this.pessoas = await this.pessoaService.get();
  }

  async adicionarPessoa() {
    if (!this.nome || !this.idade) return;
    await this.pessoaService.add(this.nome, this.idade);
    this.carregarPessoas();
    this.limparCampos();
    this.modalVisivel = false;
  }

  confirmarRemocao(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        mensagem:'Tem certeza que quer remover essa pessoa? Todas as tarefas serão removidas também'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removerPessoa(id);
      }
    });
  }

  async removerPessoa(id: number) {
    await this.pessoaService.delete(id);
    this.carregarPessoas();
  }

  atualizarPessoas() {
    console.log("🔃 Atualizando pessoas manualmente...");
    this.carregarPessoas();
  }

  abrirModal() {
    this.modalVisivel = true;
  }

  // Fechar o modal
  fecharModal() {
    this.modalVisivel = false;
  }

  limparCampos() {
    this.nome = '';
    this.idade = 0;
  }
}
