import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import textoDto from '../../../../core/dtos/texto.dto';

@Component({
  selector: 'app-card-texto',
  imports: [RouterModule],
  templateUrl: './card-texto.component.html',
  styleUrl: './card-texto.component.scss',
})
export class CardTextoComponent {
  @Input() texto!: textoDto;
}
