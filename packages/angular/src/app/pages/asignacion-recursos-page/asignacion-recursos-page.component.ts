import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxPopupModule,
  DxToastModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { PositionConfig } from 'devextreme/animation/position';
import { AlertModule } from 'src/app/components/activesoft/alert/alert.component';
import { AsignacionRecursosModule } from 'src/app/components/activesoft/asignacion-recursos/asignacion-recursos.component';
import { OrderInfoAreaModule } from 'src/app/components/activesoft/order-info-area/order-info-area.component';
import { ToolbarActionsModule } from 'src/app/components/activesoft/toolbar-actions/toolbar-actions.component';
import { FormAsignacionRecursosModule } from 'src/app/components/activesoft/form-asignacion-recursos/form-asignacion-recursos.component';
import { TransaccionRecursosService } from 'src/app/services/transaccion.recursos.service';
import { Operario } from 'src/app/types/operario';
import { Transaccion, TransaccionDetalle } from 'src/app/types/transaccion';
import { Operacion } from 'src/app/types/operacion';
import { Product } from 'src/app/types/producto';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-asignacion-recursos-page',
  templateUrl: './asignacion-recursos-page.component.html',
  styleUrls: ['./asignacion-recursos-page.component.scss'],
})
export class AsignacionRecursosPageComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dxDataGrid: DxDataGridComponent;
  editable: boolean;
  operacion?: string;
  newRows: boolean;
  asignacionRecursos: Transaccion[] = [];
  alertMessage: string =
    'Existen transacciones abiertas. Asegurese de cerrar todas las transacciones antes de continuar.';
  isVisible = false;
  type = 'info';
  position: PositionConfig = { at: { x: 'center', y: 'center' } };
  operMaqName: string = 'Operario';
  alert: boolean = false;
  deleteRegister: boolean = false;
  rowIndex: number;
  addRegister: boolean = false;
  numOrd: number;
  idCompro: string;
  idPlanta: string;
  idOperacion: string;
  operario: Operario[] = [];
  product: Product;
  idRecurso: string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private transaccionRecursos: TransaccionRecursosService
  ) {
    this.editable = true;
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      const editable = params['editable'];
      const numOrd = params['numord'];
      const idCompro = params['compro'];
      const planta = params['planta'];
      const operacion = params['operacion'];
      const enableOp = params['op'];
      if (editable == 'n') {
        this.editable = false;
        this.numOrd = numOrd;
        this.idCompro = idCompro;
        this.idPlanta = planta;
      }
      this.operacion = operacion;
    });
  }

  handleAceptarBtn(): void {
    if (this.empty()) {
      this.isVisible = true;
    }
    //this.router.navigate(['operacion-proceso-page']);
  }

  empty(): boolean {
    for (let item of this.asignacionRecursos) {
      const { fechaFin, fechaIni } = item;
      if (!fechaIni || !fechaFin) return true;
    }
    return false;
  }

  handleAddRegister(operarios: Operario[]) {
    operarios.forEach((operario) => {
      this.asignacionRecursos.push({
        idOperac: '6300',
        operario: operario,
      });
    });
    this.addRegister = false;
  }

  handleCancelRegister(cancelRegister: boolean) {
    this.addRegister = cancelRegister;
  }

  handleIniciarBtn() {
    const now: Date = new Date();
    const hora: string = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    this.asignacionRecursos.forEach((item) => {
      this.transaccionRecursos
        .postTransaccionRecurso({
          idCompro: this.idCompro,
          numero: this.numOrd,
          idOperac: this.idCompro,
          operario: item.operario,
          fechaIni: now,
          horaIni: hora,
          fechaFin: now,
          horaFin: hora,
          horasTotal: 0,
          idProduc: this.product.id,
          idPlanta: this.idPlanta,
          idOperacion: this.idOperacion,
          idRecurso: this.idRecurso,
          fechaElab: now,
          tipoTransaccion: 'R',
          tipoTiempo: 'E',
          idCausa: '',
          idActivo: '',
          idUsuari: 'PYGLPR3',
          operac: 'A',
          fecMod: new Date(),
        }).pipe(catchError((error) => {
          console.error('Ocurrió un error:', error);
          return of('error al guardar'); 
        }))
        .subscribe((value) => {
          console.log(value);
        });
    });

    this.asignacionRecursos = this.asignacionRecursos.map(
      (transaccion: Transaccion) => {
        if (!transaccion.fechaIni) {
          const now: Date = new Date();
          return {
            idOperac: transaccion.idOperac,
            operario: transaccion.operario,
            fechaIni: now.toISOString(),
            horaIni: hora,
          };
        }
        return transaccion;
      }
    );
  }

  handleDetenerTodoBtn() {
    this.asignacionRecursos = this.asignacionRecursos.map(
      (transaccion: Transaccion) => {
        if (!transaccion.fechaFin && transaccion.fechaIni) {
          const now: Date = new Date();
          const ffin: string = `${now.getFullYear()}-${now
            .getMonth()
            .toString()
            .padStart(2, '0')}-${now.getDay().toString().padStart(2, '0')}`;
          const hfin: string = `${now
            .getHours()
            .toString()
            .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
          return {
            idOperac: transaccion.idOperac,
            operario: transaccion.operario,
            fechaIni: transaccion.fechaIni,
            horaIni: transaccion.horaIni,
            fechaFin: ffin,
            horaFin: hfin,
            horasTotal: this.horasTotal(
              new Date(`${transaccion.fechaIni}T${transaccion.horaIni}:00`),
              new Date(`${ffin}T${hfin}:00`)
            ),
          };
        }
        return transaccion;
      }
    );
  }

  handlePauseBtn(data: any) {
    const now: Date = new Date();
    const { rowIndex } = data;
    const transaccion: Transaccion = this.asignacionRecursos.at(rowIndex);
    if (transaccion.fechaIni && transaccion.fechaFin) return;
    if (transaccion.fechaIni) {
      const ffin: string = `${now.getFullYear()}-${now
        .getMonth()
        .toString()
        .padStart(2, '0')}-${now.getDay().toString().padStart(2, '0')}`;
      const hfin: string = `${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
      this.asignacionRecursos[rowIndex] = {
        idOperac: transaccion.idOperac,
        operario: transaccion.operario,
        fechaIni: transaccion.fechaIni,
        horaIni: transaccion.horaIni,
        fechaFin: ffin,
        horaFin: hfin,
        horasTotal: this.horasTotal(
          new Date(`${transaccion.fechaIni}T${transaccion.horaIni}:00`),
          new Date(`${ffin}T${hfin}:00`)
        ),
      };
    }
  }

  handleDeleteTransaccion(data: any) {
    this.rowIndex = data.rowIndex;
    this.alert = !this.alert;
  }

  handleClickAlert(deleteRecord: boolean) {
    this.deleteRegister = deleteRecord;
    this.alert = !this.alert;
    if (this.deleteRegister) this.asignacionRecursos.splice(this.rowIndex, 1);
  }

  logEvent(arg0: string) {
    console.log(arg0);
  }

  private horasTotal(fechaInit: any, fechaFin: any): number {
    const diferenciaEnMilisegundos: number = Math.abs(fechaInit - fechaFin);
    const diferenciaEnMinutos: number = Math.floor(
      diferenciaEnMilisegundos / 60000
    );

    return diferenciaEnMinutos / 60;
  }

  handleTerminarProcesoBtn() {
    this.alert = !this.alert;
  }

  handleAdicionarRegistro() {
    this.addRegister = !this.addRegister;
  }

  handleOnSelectionChangedComOrd(comord: { idCompro: string; numero: number }) {
    this.idCompro = comord.idCompro;
    this.numOrd = comord.numero;
  }

  handleOnSelectionChangedOperacion(operacion: Operacion) {
    this.idOperacion = operacion.idOperacion;
  }

  handleOnSelectionChanged(planta: string) {
    this.idPlanta = planta;
  }

  handleOnSelectedProduct(product: Product) {
    this.product = product;
  }

  handleOnSelectedRecurso(recurso: any) {
    this.idRecurso = recurso
  }
}

@NgModule({
  declarations: [AsignacionRecursosPageComponent],
  imports: [
    AsignacionRecursosModule,
    ToolbarActionsModule,
    OrderInfoAreaModule,
    DxButtonModule,
    DxDataGridModule,
    DxToolbarModule,
    DxToastModule,
    AlertModule,
    DxPopupModule,
    FormAsignacionRecursosModule,
  ],
  providers: [TransaccionRecursosService],
  exports: [AsignacionRecursosPageComponent],
})
export class AsignacionRecursosPageModule {}
