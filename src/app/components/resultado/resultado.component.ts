import { Component, OnInit } from '@angular/core';
import { OrcamentoService } from '../../services/orcamento.service';

@Component({
  selector: 'app-resultado',
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Resultado</h5>
        <div class="card-text">
          <p>Valor a vista:{{ formatarDinheiro(aVista) }}</p>
          <p>Valor a prazo: {{ formatarDinheiro(aPrazo) }} em 3 parcelas de {{ formatarDinheiro(aPrazo/3) }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ResultadoComponent implements OnInit {

  aVista: number = 0;
  aPrazo: number = 0;

  constructor(private orcamentoService: OrcamentoService) { }

  ngOnInit(): void {
    this.orcamentoService.aVista$.subscribe((aVista) => {
      this.aVista = aVista;
    });

    this.orcamentoService.aPrazo$.subscribe((aPrazo) => {
      this.aPrazo = aPrazo;
    });
  }

  formatarDinheiro(numero: number): string {
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

}

