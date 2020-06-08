import { Component } from '@angular/core';

import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { Colaboracao } from "../shared/colaboracao.model";
import { ColaboracaoService } from "../shared/colaboracao.service";


@Component({
  selector: 'app-colaboracao-list',
  templateUrl: './colaboracao-list.component.html',
  styleUrls: ['./colaboracao-list.component.css']
})

export class ColaboracaoListComponent extends BaseResourceListComponent<Colaboracao> {

  constructor(private colaboracaoService: ColaboracaoService) {
    super(colaboracaoService);
  }

}
