import { Component, NgModule, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { DespejeLineaService } from 'src/app/services/despeje-linea.service';
import { DespejeLinea } from 'src/app/types/despeje';

@Component({
  selector: 'app-definicion-despeje-linea',
  templateUrl: './definicion-despeje-linea.component.html',
  styleUrls: ['./definicion-despeje-linea.component.scss'],
})
export class DefinicionDespejeLineaComponent implements OnInit {
  public despejeLista: DespejeLinea[] = [];
  tipoDespejes: { id: number; tipo: string }[] = [{id: 1, tipo: 'despeje de linea inicial'}, {id: 2, tipo: 'despeje de linea final'}];
  dataSource: any[] = [];
  constructor(private despejeLineaService: DespejeLineaService) {}

  ngOnInit(): void {
    this.despejeLineaService.getDespejesLinea().subscribe((despejes) => {
      this.despejeLista = despejes;
    });
  }
}

@NgModule({
  declarations: [DefinicionDespejeLineaComponent],
  imports: [DxDataGridModule],
  providers: [DespejeLineaService],
  exports: [DefinicionDespejeLineaComponent],
})
export class DefinicionDespejeLineaComponentModule {}
