import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiRequestService } from '../../core/services/api-request.service';
import { CardTextoComponent } from './components/card-texto/card-texto.component';

@Component({
  selector: 'app-home',
  imports: [CardTextoComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  textos: any;

  apiHtppService: ApiRequestService = inject(ApiRequestService);

  async ngOnInit(): Promise<void> {
    this.textos = [];
    this.textos = await this.apiHtppService.buscarTodosTextos();
    console.log(this.textos);
  }
}
