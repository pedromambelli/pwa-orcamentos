import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Orcamento } from '../../models/models';
import { OrcamentoService } from '../../services/orcamento.service';
import { ResultadoComponent } from '../resultado/resultado.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  form: FormGroup;
  aVista: number = 0;
  aPrazo: number = 0;

  @ViewChild(ResultadoComponent)
  resultadoComponent!: ResultadoComponent;

  constructor(private fb: FormBuilder, private orcamentoService: OrcamentoService) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      distancia: [0, Validators.required],
      volumeCalda: [10, Validators.required],
      horasTecnicas: [1, Validators.required],
      pragasAlvo: ['baratas, formigas, traças', Validators.required],
      numeroPortaIscas: [0, Validators.required]
    });

    this.form.valueChanges.subscribe((value) => {
      if (this.form.valid) {
        const orcamento: Orcamento = value;
        const resultado = this.orcamentoService.calcularOrcamento(orcamento);
        this.orcamentoService.atualizarValores(resultado.aVista, resultado.aPrazo);
      }
    });
  }


  ngOnInit() {
    
  }

  calcular() {
    if (this.form.valid) {
      const orcamento: Orcamento = this.form.value;
      const resultado = this.orcamentoService.calcularOrcamento(orcamento);

      // atualize o resultado na tela
      this.resultadoComponent.aVista = resultado.aVista;
      this.resultadoComponent.aPrazo = resultado.aPrazo;
    } else {
      alert('Preencha todos os campos');
    }
  }

  togglePragaAlvo(praga: string) {
    const control = this.form.controls['pragasAlvo'];
    const currentValue = control.value || '';
    if (currentValue.includes(praga)) {
      control.setValue(currentValue.replace(praga, '').trim());
    } else {
      control.setValue((currentValue + ' ' + praga).trim());
    }
  }
  

}
