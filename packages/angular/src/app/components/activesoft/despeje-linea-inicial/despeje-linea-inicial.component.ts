import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit, ViewChild } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxDropDownButtonModule,
  DxNumberBoxModule,
  DxTextAreaModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { OrderInfoAreaModule } from '../order-info-area/order-info-area.component';
import { ToolbarDespejeResponsableModule } from '../toolbar-despeje-responsable/toolbar-despeje-responsable.component';
import { DespejeLineaService } from 'src/app/services/despeje-linea.service';
import { DespejeLinea, ProDespejeOrden } from 'src/app/types/despeje';
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
  numOrdAnt: number;

  constructor(
    private despejeLineaService: DespejeLineaService,
    private proDespejeOrdenService: ProDespejeOrdenService
  ) {}

  ngOnInit(): void {
    this.getItems();
  }

  async handleSaveRecord() {
    this.guardarDespejeInicial();
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

  private getItems() {
    this.despejeLineaService
      .getDespejeLinea(TIPO_DESPEJE)
      .subscribe((value) => {
        value?.forEach((item) => {
          this.datasource.push({
            id: item.id,
            descripcion: item.descripcion,
            descTipoDespeje: item.descTipoDespeje,
            valordefecto: undefined,
            idTipoDespeje: item.idTipoDespeje,
            resultado: true,
          });
          this.items = this.datasource.filter((value) => value.id != 1);
        });
      });
  }

  private guardarDespejeInicial() {
    if (
      this.realizadoPor &&
      this.verificadoPor &&
      this.idOperacion &&
      this.numOrdAnt
    ) {
      const now: Date = new Date();;
      const numeroOrdenItem = this.datasource.find((value) => value.id == 1);
      this.insertarNumeroOrde(numeroOrdenItem.id, this.numOrdAnt, now);
      this.insertarItems(now);
    } else {
      this.alert = true;
      this.alertaText = 'Complete todos los datos antes de continuar';
    }
  }

  private insertarDespejeOrden(
    idDespeje: number,
    valor: string | number,
    fecReg: Date,
    fecMod: Date
  ) {
    return {
      idCompro: this.idCompro,
      numero: this.numOrd,
      idProDespejeLinea: idDespeje,
      idOperacion: this.idOperacion,
      idRealizadoPor: this.realizadoPor,
      idVerificadoPor: this.verificadoPor,
      valor: String(valor),
      resultado: '1',
      fecReg: fecReg,
      fecMod: fecMod,
    };
  }

  private insertarNumeroOrde(idItem: number, numOrden: number, now){
    this.proDespejeOrdenService.createProDespejeOrden(this.insertarDespejeOrden(idItem, numOrden, now, now)).subscribe(value=>{console.log(value)});
  }

  private insertarItems(now: Date) {
    
    this.items.forEach((item) => {
        this.proDespejeOrdenService
          .createProDespejeOrden(this.insertarDespejeOrden(item.id, item.valorDefecto, now, now))
          .subscribe((value) => {
            this.alert = true;
            this.alertaText = '¡Datos almacenados con exito!';
          });
      });
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
    DxNumberBoxModule,
  ],
  providers: [DespejeLineaService, OperarioService, ProDespejeOrdenService],
  exports: [DespejeLineaInicialComponent],
})
export class DespejeLineaInicialModule {}
