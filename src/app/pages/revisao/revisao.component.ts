import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import flashcardDto from '../../core/dtos/flashcard.dto';
import { ApiRequestService } from '../../core/services/api-request.service';
import { SuperMemoService } from '../../core/services/super-memo.service';

@Component({
  selector: 'revisao',
  imports: [CommonModule],
  templateUrl: './revisao.component.html',
  styleUrl: './revisao.component.scss',
})
export class RevisaoComponent implements OnInit {
  mostrarResposta: boolean = false;
  flashcards: flashcardDto[] | null = [];
  flashcardsAtualizados: flashcardDto[] = [];
  indexCardAtual: number = 0;

  apiRequestService: ApiRequestService = inject(ApiRequestService);
  superMemoService: SuperMemoService = inject(SuperMemoService);

  async ngOnInit(): Promise<void> {
    this.flashcards =
      await this.apiRequestService.buscarTodosFlashcardsRevisar();
  }

  atualizarFlashcard(grade: 0 | 1 | 2 | 3 | 4 | 5) {
    let itemAtual = this.flashcards![this.indexCardAtual];

    console.log(structuredClone(itemAtual));

    let itemSuperMemo = this.superMemoService.supermemo(itemAtual, grade);

    itemAtual.interval = itemSuperMemo.interval;
    itemAtual.repetition = itemSuperMemo.repetition;
    itemAtual.efactor = itemSuperMemo.efactor;

    this.flashcardsAtualizados.push(itemAtual);

    this.mostrarResposta = false;
    this.indexCardAtual++;
  }
}
