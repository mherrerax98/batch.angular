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
import {
  ActualizarRecurso,
  Transaccion,
  TransaccionDetalle,
} from 'src/app/types/transaccion';
import { Operacion } from 'src/app/types/operacion';
import { Product } from 'src/app/types/producto';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TituloPaginaModule } from 'src/app/components/activesoft/titulo-pagina/titulo-pagina.component';

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
  asignacionRecursos: any[] = [];
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
  nuevoRecurso: any[] = [];
  recursos: any[] = [];

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
    const date: Date = new Date();
    const hora: string = this.getHora(date);
    this.nuevoRecurso = this.agregarRecurso(operarios, date, hora);
    this.transaccionRecursos.post(this.nuevoRecurso).subscribe((recursos) => {
      this.asignacionRecursos.push(...recursos);
    });
    this.addRegister = false;
  }

  calcularFechaFin: Function = ({ fechaIni, fechaFin }) =>
    fechaFin > fechaIni ? fechaFin : '';
  calcularHoraFin: Function = ({ fechaIni, fechaFin, horaFin }) =>
    fechaFin > fechaIni ? horaFin : '';
  calcularFechaIni: Function = ({ fechaIni, fechaFin }) =>
    fechaIni === fechaFin ? '' : fechaIni;
  calcularHoraIni: Function = ({ fechaIni, fechaFin, horaIni }) =>
    fechaIni === fechaFin ? '' : horaIni;

  private agregarRecurso(operarios: Operario[], date: Date, hora: string) {
    return operarios.map((operario) => {
      return {
        idOperac: '6300',
        operario: operario,
        idCompro: this.idCompro,
        numero: this.numOrd,
        idProduc: this.product.id,
        idPlanta: this.idPlanta,
        idOperacion: this.idOperacion,
        idRecurso: this.idRecurso,
        tipoTransaccion: 'R',
        tipoTiempo: 'E',
        idCausa: null,
        idActivo: null,
        idUsuari: 'PYGLPR1',
        operac: 'A',
        fechaElab: date,
        fechaIni: date,
        horaIni: hora,
        fechaFin: date,
        horaFin: hora,
        horasTotal: 0,
        fecMod: date,
      };
    });
  }

  handleCancelRegister(cancelRegister: boolean) {
    this.addRegister = cancelRegister;
  }

  private getHora(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  handleIniciarBtn() {
    const now: Date = new Date();
    const hora: string = this.getHora(now);
    const recursosSinIniciar = this.RecursosSinIniciar();
    const recursosIniciados = this.iniciarRecursos(
      recursosSinIniciar,
      now,
      hora
    );
    this.transaccionRecursos
      .updateInicial(recursosIniciados)
      .subscribe((recursos) => {
        this.actualizarRecursos(recursos);
      });
  }

  actualizarRecursos(recursos: ActualizarRecurso[]) {
    recursos.forEach((item) => {
      const recurso = this.dxDataGrid.instance
        .getDataSource()
        .items()
        .find((tr) => tr.idTransaccion === item.idTransaccion);
      this.dxDataGrid.instance
        .getDataSource()
        .store()
        .update(item.idTransaccion, {
          ...recurso,
          fechaIni: item.nuevaFecha,
          horaIni: item.hora,
        });
    });
  }

  private iniciarRecursos(
    recursosSinIniciar: any[],
    now: Date,
    hora: string
  ): ActualizarRecurso[] {
    return recursosSinIniciar.map((recurso) => {
      return {
        idTransaccion: recurso.idTransaccion,
        idCompro: recurso.idCompro,
        numero: recurso.numero,
        nuevaFecha: now,
        hora: hora,
      };
    });
  }

  private RecursosSinIniciar(): any[] {
    const recursos: any[] = [];
    this.asignacionRecursos.forEach((recurso) => {
      const { fechaIni, fechaFin, horaIni, horaFin } = recurso;
      const fechasIguales: boolean = fechaIni == fechaFin && horaIni == horaFin;
      if (fechasIguales) recursos.push(recurso);
    });
    return recursos;
  }

  private detenerRecurso(
    recursosSinDetener: any[],
    date: Date,
    hora: string
  ): any[] {
    return recursosSinDetener.map((recurso) => {
      return {
        idTransaccion: recurso.idTransaccion,
        idCompro: recurso.idCompro,
        numero: recurso.numero,
        nuevaFecha: date,
        hora: hora,
        horasTotal: this.horasTotal(
          this.formatearFecha(recurso.fechaIni, recurso.horaIni),
          this.formatearFecha(date, hora)
        ),
      };
    });
  }

  private recursosSinDetener(): any[] {
    return this.asignacionRecursos.filter(
      (recurso) => recurso.fechaIni > recurso.fechaFin
    );
  }

  handleDetenerTodoBtn() {
    const now: Date = new Date();
    const hora: string = this.getHora(now);
    const recursosSinDetener = this.recursosSinDetener();
    const recursosDetenidos: ActualizarRecurso[] = this.detenerRecurso(
      recursosSinDetener,
      now,
      hora
    );
    this.transaccionRecursos
      .updateFinal(recursosDetenidos)
      .subscribe((actualizados) => {
        actualizados.forEach((recurso) => {
          const { idTransaccion, nuevaFecha, hora } = recurso;
          this.actualizar(nuevaFecha, hora, idTransaccion);
        });
      });
  }

  actualizar(date: Date, hora: string, idTransaccion: number) {
    const recurso = this.dxDataGrid.instance
      .getDataSource()
      .items()
      .find((tr) => tr.idTransaccion === idTransaccion);
    this.dxDataGrid.instance
      .getDataSource()
      .store()
      .update(idTransaccion, {
        fechaFin: date,
        horaFin: hora,
        horasTotal: this.horasTotal(
          this.formatearFecha(recurso.fechaIni, recurso.horaIni),
          this.formatearFecha(date, hora)
        ),
      });
  }

  handlePauseBtn(recurso: any) {
    const {
      data: { idTransaccion },
    } = recurso;
    const now: Date = new Date();
    const hora: string = this.getHora(now);
    this.transaccionRecursos
      .updateOne(this.idCompro, this.numOrd, idTransaccion, {
        fecha: now,
        hora: hora,
      })
      .subscribe((recurso) => {
        const { idTransaccion, nuevaFecha, hora } = recurso;
        this.actualizar(nuevaFecha, hora, idTransaccion);
      });
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

  private formatearFecha(date: Date, hora: string): Date {
    const _date = new Date(date);

    if (isNaN(_date.getTime())) {
        console.error('La cadena de texto no es una fecha válida:', date);
        return null; 
    }

    const año = _date.getFullYear();
    const mes = (_date.getMonth() + 1).toString().padStart(2, '0'); 
    const dia = _date.getDate().toString().padStart(2, '0'); 
    return new Date(`${año}-${mes}-${dia}T${hora}:00`);
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
    this.idRecurso = recurso;
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
    TituloPaginaModule,
  ],
  providers: [TransaccionRecursosService],
  exports: [AsignacionRecursosPageComponent],
})
export class AsignacionRecursosPageModule {}
