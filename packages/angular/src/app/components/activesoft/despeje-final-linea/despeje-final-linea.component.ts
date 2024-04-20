import { Component, Input, NgModule, OnInit, ViewChild } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
} from 'devextreme-angular';
import { OrderInfoAreaModule } from '../order-info-area/order-info-area.component';
import { ToolbarDespejeResponsableModule } from '../toolbar-despeje-responsable/toolbar-despeje-responsable.component';
import { DespejeLineaService } from 'src/app/services/despeje-linea.service';
import { DespejeLinea } from 'src/app/types/despeje';
import { Operario } from 'src/app/types/operario';
import { ProDespejeOrdenService } from 'src/app/services/prodespeje.orden.service';
import { CommonModule } from '@angular/common';
import { AlertModule } from '../alert/alert.component';
import { Operacion } from 'src/app/types/operacion';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const TIPO_DESPEJE: string = 'DLF';

@Component({
  selector: 'app-despeje-final-linea',
  templateUrl: './despeje-final-linea.component.html',
  styleUrls: ['./despeje-final-linea.component.scss'],
})
export class DespejeFinalLineaComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGridDespejeInicial: DxDataGridComponent;
  @Input() operacion: string;
  @Input() editable: boolean = true;
  @Input() idCompro: string;
  @Input() numOrd: number;
  @Input() idPlanta: string;

  plantaDataSource = ['Principal'];
  items: DespejeLinea[];
  datasource: any[] = [];
  operarios: Operario[];
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
    this.getItems();
  }

  handleAceptarButton() {
    if (this.validarCampos()) {
      this.insertarItems();
      this.mostrarAlerta('¡Datos almacenados con exito!');
    } else {
      this.mostrarAlerta('Complete todos los datos antes de continuar');
    }
  }

  handleSelectedOperarios(event: Operario[]) {
    this.operarios = event;
  }

  handleOnValueChangedVerificadoPor(operario: string | null) {
    this.verificadoPor = operario;
  }

  handleOnValueChangedRealizadoPor(operario: string | null) {
    this.realizadoPor = operario;
  }

  handleOnSelectionChangedOperacion(operacion: Operacion) {
    this.idOperacion = operacion.idOperacion;
  }

  handleClickAlert() {
    this.alert = !this.alert;
  }

  private getItems() {
    this.despejeLineaService
      .getDespejeLinea(TIPO_DESPEJE)
      .subscribe((value) => {
        value?.forEach((item) => {
          this.datasource.push({
            id: item.id,
            descripcion: item.descripcion,
            descTipoDespeje: item.descTipoDespeje,
            valorDefecto: undefined,
            idTipoDespeje: item.idTipoDespeje,
            resultado: true,
          });
        });
      });
  }

  private validarCampos(): boolean {
    const tieneRealizador = !!this.realizadoPor;
    const tieneVerificador = !!this.verificadoPor;
    const tieneIdOperacion = !!this.idOperacion;
    const itemsVacios = this.datasource.some(value => !!value.valorDefecto === false);

    return tieneRealizador && tieneVerificador && tieneIdOperacion && !itemsVacios;
  }

  private insertarDespeje(idItem: number, valor: string, now: Date) {
    return {
      idCompro: this.idCompro,
      numero: this.numOrd,
      idProDespejeLinea: idItem,
      idOperacion: this.idOperacion,
      idRealizadoPor: this.realizadoPor,
      idVerificadoPor: this.verificadoPor,
      valor: valor,
      resultado: '1',
      fecReg: now,
      fecMod: now,
    };
  }

  private insertarItems() {
    const now: Date = new Date();
    const items = this.dataGridDespejeInicial.instance.getDataSource().items();
    items.forEach((item) => {
      this.proDespejeOrdenService
        .createProDespejeOrden(this.insertarDespeje(item.id, item.valorDefecto, now))
        .subscribe((value) => {
        });
    });
  }

  private mostrarAlerta(mensaje: string): void {
    this.alert = true;
    this.alertaText = mensaje;
  }
}

@NgModule({
  declarations: [DespejeFinalLineaComponent],
  imports: [
    DxDataGridModule,
    OrderInfoAreaModule,
    ToolbarDespejeResponsableModule,
    DxButtonModule,
    CommonModule,
    AlertModule,
  ],
  providers: [DespejeLineaService, ProDespejeOrdenService],
  exports: [DespejeFinalLineaComponent],
})
export class DespejeFinalLineaModule {}
