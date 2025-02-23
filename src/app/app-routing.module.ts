import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarefaComponent } from './components/tarefa/tarefa.component';
import { PessoaComponent } from './components/pessoa/pessoa.component';

const routes: Routes = [
  { path: 'tarefas', component: TarefaComponent },
  { path: 'pessoas', component: PessoaComponent },
  { path: '', redirectTo: '/tarefas', pathMatch: 'full' } // Redireciona para Tarefas ao iniciar
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
