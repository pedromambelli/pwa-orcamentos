import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Orcamento } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  private aVistaSource = new BehaviorSubject<number>(0);
  private aPrazoSource = new BehaviorSubject<number>(0);

  aVista$ = this.aVistaSource.asObservable();
  aPrazo$ = this.aPrazoSource.asObservable();

  constructor() { }

  atualizarValores(aVista: number, aPrazo: number) {
    this.aVistaSource.next(aVista);
    this.aPrazoSource.next(aPrazo);
  }
  calcularOrcamento(orcamento: Orcamento): { aVista: number, aPrazo: number } {
    
    // DEFINIÇÃO DE REFERENCIAS
    const horaTecnicaDia = 5;
    const numFuncionarios = 3;
    const custoEstimadoHt = 18.75;
    const custoProdutoLitro = 3.00;
    const custoKm = 1.00;
    const horaTecnicaSac = 6.00;
    const horaTecnicaAdm = 9.33;
    const custoAquisicaoCliente = 5.00;
    const margemNegociacao = 0.2;
    const margemRetrabalho = 0.2;
    const margemLucro = 0.25;
    const imposto = 0.19;
    const taxaMaquininha = 0.08;
    const descontoAVista = 0.10;
    const custoPortaIsca = 6.0;
    
    const { nome, distancia, volumeCalda, horasTecnicas, pragasAlvo, numeroPortaIscas } = orcamento

    const distancia_ajustada = distancia > 10 ? distancia : 10

    const custoDesratizacao = custoPortaIsca * numeroPortaIscas;
    const custoHt = horasTecnicas * custoEstimadoHt + horaTecnicaSac + horaTecnicaAdm;
    const custoProduto = custoProdutoLitro * volumeCalda + custoDesratizacao;
    const custoDeslocamento = custoKm * distancia_ajustada;

    const custoSubtotal = custoHt + custoProduto + custoDeslocamento;
    const custoComRetrabalho = custoSubtotal / (1 - margemRetrabalho);
    const custoComMargemNegociacao = custoComRetrabalho / (1 - margemNegociacao);
    const custoComMargemDeLucro = custoComMargemNegociacao / (1 - margemLucro);
    const custoComMaquininha = custoComMargemDeLucro / (1 - taxaMaquininha);
    const custoComImposto = custoComMaquininha / (1 - imposto);
    const precoAPrazo = Math.round(custoComImposto / 5) * 5;
    const precoAVista = Math.round((precoAPrazo * 0.9) / 5) * 5; 

    return { aVista: precoAVista, aPrazo: precoAPrazo };
  }
}
