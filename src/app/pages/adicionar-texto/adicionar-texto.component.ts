import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ApiRequestService } from '../../core/services/api-request.service';

@Component({
  selector: 'app-adicionar-texto',
  imports: [QuillModule, FormsModule, ReactiveFormsModule],
  templateUrl: './adicionar-texto.component.html',
  styleUrl: './adicionar-texto.component.scss',
  providers: [],
})
export class AdicionarTextoComponent {
  apiRequest: ApiRequestService = inject(ApiRequestService);
  formBuilder: FormBuilder = inject(FormBuilder);

  formTexto: FormGroup = this.formBuilder.group({
    titulo: new FormControl('', Validators.required),
    conteudo: new FormControl('', Validators.required),
  });

  async adicionarTexto() {
    if (!this.formTexto.valid) return;

    let retorno = await this.apiRequest.adicionarTexto(this.formTexto.value);
    console.log(retorno);
  }
}
