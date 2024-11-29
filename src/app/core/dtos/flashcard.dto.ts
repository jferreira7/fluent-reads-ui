export default interface flashcardDto {
  _id: string;
  conteudo: string;
  traducao: string;
  interval: number;
  repetition: number;
  efactor: number;
  trecho: string;
  contexto: string;
  last_review: number;
  next_review: number;
  craetedAt: number;
}
