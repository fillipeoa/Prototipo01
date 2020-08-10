import { PipeTransform, Pipe } from '@angular/core';
import { Colaboracao } from '../shared/colaboracao.model';

@Pipe({
  name: 'filtro'
})
export class ColaboracaoFilterPipe implements PipeTransform {
  transform(colaboracoes: Colaboracao[], filtro: string): Colaboracao[]{
    if (!colaboracoes || !filtro) {
      return colaboracoes;
    }
    return colaboracoes.filter(colaboracao =>
      colaboracao.dataRegistro.indexOf(filtro) !== -1);
  }
}


