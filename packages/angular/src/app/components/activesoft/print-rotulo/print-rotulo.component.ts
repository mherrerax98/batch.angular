import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
} from 'devextreme-angular';
import { RowClickEvent } from 'devextreme/ui/data_grid';
import { MateriaPrimaService } from 'src/app/services/materia.prima.service';
import { MateriaPrima } from 'src/app/types/materiaPrima';

@Component({
  selector: 'app-print-rotulo',
  templateUrl: './print-rotulo.component.html',
  styleUrls: ['./print-rotulo.component.scss'],
})
export class PrintRotuloComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  selectedItem: any;
  materiaPrima: MateriaPrima[] = [];
  idCompro: string;
  numero: number;

  constructor(private materiaPrimaService: MateriaPrimaService) {}

  ngOnInit(): void {
    this.materiaPrimaService
      .getMateriaPrima('6300', 56347)
      .subscribe((values) => {
        this.materiaPrima = values;
      });
  }

  handleRowClick(row: RowClickEvent) {
    const { data } = row;
    this.selectedItem = data;
  }

  handleOnClickCopy() {
    this.dataGrid.instance.getDataSource().store().insert(this.selectedItem);
  }

  calculateCellValue({ unidad }) {
    switch( unidad ){
      case 'KILOS': return 'kg';
      default: return '';
    }
  }
}

@NgModule({
  declarations: [PrintRotuloComponent],
  imports: [DxDataGridModule, DxButtonModule],
  providers: [MateriaPrimaService],
  exports: [PrintRotuloComponent],
})
export class PrintRotuloModule {}
