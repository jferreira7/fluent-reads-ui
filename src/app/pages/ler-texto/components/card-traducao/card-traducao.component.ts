import { Component, inject, Input } from '@angular/core';
import traducaoDto from '../../../../core/dtos/traducao.dto';
import { ApiRequestService } from '../../../../core/services/api-request.service';

@Component({
  selector: 'card-traducao',
  imports: [],
  templateUrl: './card-traducao.component.html',
  styleUrl: './card-traducao.component.scss',
})
export class CardTraducaoComponent {
  @Input() textoOriginal!: string;
  @Input() traducao!: traducaoDto | null;
  @Input() contexto!: string | null;

  apiRequestService: ApiRequestService = inject(ApiRequestService);

  adicionarCard(traducao: string) {
    let palavra = {
      conteudo: this.textoOriginal,
      traducao: traducao,
      contexto: this.contexto,
      interval: 0,
      repetition: 0,
      efactor: 0,
      last_review: null,
      next_review: Date.now(),
    };

    this.apiRequestService.adicionarFlashcard(palavra);
  }
}
