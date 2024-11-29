import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuillModule } from 'ngx-quill';
import traducaoDto from '../../core/dtos/traducao.dto';
import { ApiRequestService } from '../../core/services/api-request.service';
import { CardTraducaoComponent } from './components/card-traducao/card-traducao.component';

@Component({
  selector: 'app-ler-texto',
  imports: [QuillModule, CardTraducaoComponent],
  templateUrl: './ler-texto.component.html',
  styleUrl: './ler-texto.component.scss',
})
export class LerTextoComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  route: ActivatedRoute = inject(ActivatedRoute);
  apiHttpService: ApiRequestService = inject(ApiRequestService);
  renderer: Renderer2 = inject(Renderer2);
  el: ElementRef = inject(ElementRef);

  texto: string = '';
  titulo: string = '';

  traducao: traducaoDto | null = null;
  textoOriginal: string = '';
  contexto: string = '';

  async ngOnInit(): Promise<void> {
    let textoId = this.route.snapshot.paramMap.get('id');

    if (textoId == null) return;

    let texto = await this.apiHttpService.buscarTextoById(textoId);

    if (texto == null) return;

    this.titulo = texto.titulo;
    this.texto = this.processHtmlContent(texto.conteudo);
  }

  ngAfterViewInit() {
    // document.addEventListener('selectionchange', (e) => {
    //   console.log('Focus Node - ', window!.getSelection()!.toString());
    // });
  }

  ngAfterViewChecked(): void {
    const spans = this.el.nativeElement.querySelectorAll(
      'span[id^="w"]:not(.event-added)'
    );
    spans.forEach((span: HTMLElement) => {
      this.renderer.listen(
        span,
        'click',
        this.buscarSignificadoPalavra.bind(this)
      );
      this.renderer.addClass(span, 'event-added');
    });
  }

  buscarSignificadoPalavra(element: any): void {
    const centralWord = element.target.textContent.trim(); // Palavra central
    const parentElement = element.target.parentElement; // Parágrafo ou container do texto

    if (!parentElement) {
      console.error('Elemento pai não encontrado.');
      return;
    }

    let words: string[] = [];
    let centralIndex = -1;

    function traverse(node: Node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || '';
        const nodeWords = text.split(/(\s+|\b)/); // Mantém espaços e pontuações
        words.push(...nodeWords);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el === element.target) {
          const text = el.textContent || '';
          const nodeWords = text.split(/(\s+|\b)/);
          centralIndex =
            words.length +
            nodeWords.findIndex((word: string) => word.trim() === centralWord);
          words.push(...nodeWords);
        } else {
          for (let child of node.childNodes) {
            traverse(child);
          }
        }
      }
    }

    traverse(parentElement);

    if (centralIndex === -1) {
      console.error('Palavra central não encontrada no texto.');
      return;
    }

    // Obtém até 4 palavras antes e depois
    const start = Math.max(centralIndex - 8, 0); // Inclui pontuações antes
    const end = Math.min(centralIndex + 9, words.length); // Inclui pontuações depois

    const context = words.slice(start, end).join('');
    this.contexto = context;

    let data = {
      text: element.target.textContent,
      from: 'en',
      to: 'pt',
    };

    this.apiHttpService.traduzirPalavra(data).then((traducao) => {
      this.textoOriginal = element.target.textContent;
      this.traducao = traducao;

      console.log(element.target.textContent);
      console.log(traducao);
    });
  }

  processHtmlContent(htmlContent: string): string {
    // Parseia o HTML em um documento DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    let wordCounter = 1;

    // Função recursiva para percorrer e processar os nós
    const wrapWordsInNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;

        if (text?.trim()) {
          // Expressão regular para separar palavras e preservar pontuação
          const words = text.split(/(\s+|,|\.)/g);
          const fragment = document.createDocumentFragment();

          words.forEach((word) => {
            if (/\s+|,|\./.test(word)) {
              fragment.appendChild(document.createTextNode(word));
            } else if (word) {
              const span = document.createElement('span');
              span.id = `w${wordCounter++}`;
              span.classList.add('cursor-pointer');
              span.classList.add('rounded-[5px]'); // Adicione o arredondamento padrão
              span.classList.add('py-[2px]'); // Adicione o padding padrão
              span.classList.add('px-[1px]'); // Adicione o padding padrão
              span.classList.add('border-transparent'); // Define uma borda invisível
              span.classList.add('border-[1px]'); // Garante que a borda já exista

              // Estilos de hover
              span.classList.add('hover:rounded-[5px]');
              span.classList.add('hover:py-[2px]');
              span.classList.add('hover:px-[1px]');
              span.classList.add('hover:border-gray-400');
              span.textContent = word;
              // span.addEventListener('click', (e) => {
              //   console.log(e);
              // });
              fragment.appendChild(span);
            }
          });

          node.parentNode?.replaceChild(fragment, node);
        }
      } else {
        node.childNodes.forEach((child) => wrapWordsInNode(child));
      }
    };

    // Inicia o processamento a partir do body
    doc.body.childNodes.forEach((node) => wrapWordsInNode(node));

    // Retorna o HTML processado
    return doc.body.innerHTML;
  }
}
