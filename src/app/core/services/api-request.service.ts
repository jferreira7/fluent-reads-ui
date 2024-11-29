import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';
import flashcardDto from '../dtos/flashcard.dto';
import textoDto from '../dtos/texto.dto';
import traducaoDto from '../dtos/traducao.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  http: HttpClient = inject(HttpClient);

  private readonly HOSTNAME = environment.apiBaseUrl;

  async traduzirPalavra(data: any): Promise<traducaoDto | null> {
    try {
      return await firstValueFrom(
        this.http.post<traducaoDto>(`${this.HOSTNAME}/texto/traduzir`, data)
      );
    } catch (error) {
      return null;
    }
  }

  async buscarTextoById(textoId: string): Promise<textoDto | null> {
    try {
      return await firstValueFrom(
        this.http.get<textoDto>(
          `${this.HOSTNAME}/texto/buscar?textoId=${textoId}`
        )
      );
    } catch (error) {
      return null;
    }
  }

  async adicionarTexto(data: any): Promise<string | null> {
    try {
      return await firstValueFrom(
        this.http.post<string>(`${this.HOSTNAME}/texto/adicionar`, data)
      );
    } catch (error) {
      return null;
    }
  }

  async buscarTodosTextos(): Promise<textoDto[] | null> {
    try {
      return await firstValueFrom(
        this.http.get<textoDto[]>(`${this.HOSTNAME}/texto/buscarTodos`)
      );
    } catch (error) {
      return null;
    }
  }

  async adicionarFlashcard(data: any): Promise<string | null> {
    try {
      return await firstValueFrom(
        this.http.post<string>(`${this.HOSTNAME}/flashcard/adicionar`, data)
      );
    } catch (error) {
      return null;
    }
  }

  async buscarTodosFlashcards(): Promise<flashcardDto[] | null> {
    try {
      return await firstValueFrom(
        this.http.get<flashcardDto[]>(`${this.HOSTNAME}/flashcard/buscarTodos`)
      );
    } catch (error) {
      return null;
    }
  }

  async buscarTodosFlashcardsRevisar(): Promise<flashcardDto[] | null> {
    try {
      return await firstValueFrom(
        this.http.get<flashcardDto[]>(
          `${this.HOSTNAME}/flashcard/buscarTodosRevisarHoje`
        )
      );
    } catch (error) {
      return null;
    }
  }

  formatarDadosEmptyToNull(data: any) {
    Object.keys(data).forEach((key) => {
      if (data[key] === '') data[key] = null;
    });
  }

  formatarDadosNullToEmpty(data: any) {
    Object.keys(data).forEach((key) => {
      if (data[key] === null) data[key] = '';
    });
  }

  formatarDadosNumberToString(data: any) {
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'number') data[key] = String(data[key]);
    });

    return data;
  }
}
