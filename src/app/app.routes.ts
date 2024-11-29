import { Routes } from '@angular/router';
import { AdicionarTextoComponent } from './pages/adicionar-texto/adicionar-texto.component';
import { FlashcardsComponent } from './pages/flashcards/flashcards.component';
import { HomeComponent } from './pages/home/home.component';
import { LerTextoComponent } from './pages/ler-texto/ler-texto.component';
import { RevisaoComponent } from './pages/revisao/revisao.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'texto',
    children: [
      {
        path: 'adicionar',
        component: AdicionarTextoComponent,
      },
      {
        path: ':id',
        component: LerTextoComponent,
      },
    ],
  },
  {
    path: 'flashcards',
    component: FlashcardsComponent,
    children: [],
  },
  {
    path: 'flashcards/revisao',
    component: RevisaoComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
