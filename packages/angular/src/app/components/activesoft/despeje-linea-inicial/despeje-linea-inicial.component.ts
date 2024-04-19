import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit, ViewChild } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxDropDownButtonModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { OrderInfoAreaModule } from '../order-info-area/order-info-area.component';
import { ToolbarDespejeResponsableModule } from '../toolbar-despeje-responsable/toolbar-despeje-responsable.component';
import { DespejeLineaService } from 'src/app/services/despeje-linea.service';
import { DespejeLinea } from 'src/app/types/despeje';
import { OperarioService } from 'src/app/services/operario.service';
import { Operario } from 'src/app/types/operario';
import { ProDespejeOrdenService } from 'src/app/services/prodespeje.orden.service';
import { AlertModule } from '../alert/alert.component';
import { Operacion } from 'src/app/types/operacion';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const TIPO_DESPEJE: string = 'DLI';

@Component({
  selector: 'app-despeje-linea-inicial',
  templateUrl: './despeje-linea-inicial.component.html',
  styleUrls: ['./despeje-linea-inicial.component.scss'],
})
export class DespejeLineaInicialComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGridDespejeInicial: DxDataGridComponent;
  @Input() editable: boolean = true;
  @Input() idCompro: string;
  @Input() idPlanta: string;
  @Input() numOrd: number;
  @Input() enableOP: boolean;
  @Input() operacion?: string | null;

  valor: string = 'SI';
  plantaDataSource = ['Principal'];
  items: DespejeLinea[];
  datasource: any[] = [];
  verificadoPor: string | null;
  realizadoPor: string | null;
  alert: boolean = false;
  idOperacion: string | null;
  alertaText: string;

  constructor(
    private despejeLineaService: DespejeLineaService,
    private proDespejeOrdenService: ProDespejeOrdenService
  ) {}

  ngOnInit(): void {
    this.despejeLineaService
      .getDespejeLinea(TIPO_DESPEJE)
      .subscribe((value) => {
        value?.forEach((item) => {
          this.datasource.push({
            id: item.id,
            descripcion: item.descripcion,
            descTipoDespeje: item.descTipoDespeje,
            valordefecto: '',
            idTipoDespeje: item.idTipoDespeje,
            resultado: true,
          });
        });
      });
  }

  handleSelectedOperarios(event: Operario[]) {}

  async handleSaveRecord() {
    if (this.realizadoPor && this.verificadoPor && this.idOperacion) {
      const now: Date = new Date();
      const items = this.dataGridDespejeInicial.instance
        .getDataSource()
        .items();
      items.forEach((item) => {
        console.log(item);
        this.proDespejeOrdenService
          .createProDespejeOrden({
            idCompro: this.idCompro,
            numero: this.numOrd,
            idProDespejeLinea: item.id,
            idOperacion: this.idOperacion,
            idRealizadoPor: this.realizadoPor,
            idVerificadoPor: this.verificadoPor,
            valor: item.valorDefecto,
            resultado: '1',
            fecReg: now,
            fecMod: now,
          })
          .subscribe((value) => {
            this.alert = true;
            this.alertaText = '¡Datos almacenados con exito!';
          });
      });
    } else {
      this.alert = true;
      this.alertaText = 'Complete todos los datos antes de continuar';
    }
  }

  handleOnValueChangedVerificadoPor(operario: string | null) {
    this.verificadoPor = operario;
  }

  handleOnValueChangedRealizadoPor(operario: string | null) {
    this.realizadoPor = operario;
  }

  handleClickAlert() {
    this.alert = !this.alert;
  }

  handleOnSelectionChangedOperacion(operacion: Operacion) {
    this.idOperacion = operacion.idOperacion;
  }
}

@NgModule({
  declarations: [DespejeLineaInicialComponent],
  imports: [
    DxDataGridModule,
    CommonModule,
    OrderInfoAreaModule,
    ToolbarDespejeResponsableModule,
    DxDropDownButtonModule,
    DxTextBoxModule,
    OrderInfoAreaModule,
    DxButtonModule,
    AlertModule,
  ],
  providers: [DespejeLineaService, OperarioService, ProDespejeOrdenService],
  exports: [DespejeLineaInicialComponent],
})
export class DespejeLineaInicialModule {}
