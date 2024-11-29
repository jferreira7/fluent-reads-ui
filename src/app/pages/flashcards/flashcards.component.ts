import { Component, inject, OnInit } from '@angular/core';
import { ApiRequestService } from '../../core/services/api-request.service';

import { RouterModule } from '@angular/router';

import flashcardDto from '../../core/dtos/flashcard.dto';

@Component({
  selector: 'flashcards',
  imports: [RouterModule],
  templateUrl: './flashcards.component.html',
  styleUrl: './flashcards.component.scss',
})
export class FlashcardsComponent implements OnInit {
  apiRequestService: ApiRequestService = inject(ApiRequestService);

  flashcards: flashcardDto[] | null = [];

  async ngOnInit(): Promise<void> {
    this.flashcards =
      await this.apiRequestService.buscarTodosFlashcardsRevisar();
  }
}
