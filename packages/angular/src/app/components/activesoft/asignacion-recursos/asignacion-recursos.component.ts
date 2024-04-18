import {
  Component,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxDropDownBoxModule,
  DxDropDownButtonModule,
  DxPopupModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { OrderInfoAreaModule } from '../order-info-area/order-info-area.component';
import { TransaccionRecursosService } from 'src/app/services/transaccion.recursos.service';
import { Transaccion } from 'src/app/types/transaccion';
import { OperarioService } from 'src/app/services/operario.service';
import { Operario } from 'src/app/types/operario';
import { ThisReceiver } from '@angular/compiler';
import { Console } from 'console';

@Component({
  selector: 'app-asignacion-recursos',
  templateUrl: './asignacion-recursos.component.html',
  styleUrls: ['./asignacion-recursos.component.scss'],
})
export class AsignacionRecursosComponent implements OnInit, OnChanges {
handleAceptarBtn() {
}
  @ViewChild(DxDataGridComponent) dxDataGrid: DxDataGridComponent;

  asignacionRecursos: Transaccion[];
  operarios: Operario[];

  @Input() newRows: any;

  constructor(
    private transaccionRecursos: TransaccionRecursosService,
    private operariosService: OperarioService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { newRows } = changes;
    console.log(newRows);
    /*this.transaccionRecursos.getTransaccionRecursos('6300', '6300', 51761)
    .subscribe((value) => {
      this.asignacionRecursos = value;
      console.log(value);
    });*/
    this.dxDataGrid.instance.refresh();
  }

  ngOnInit(): void {
    /*this.transaccionRecursos
      .getTransaccionRecursos('6300', '6300', 51761)
      .subscribe((value) => {
        this.asignacionRecursos = value;
        console.log(value);
      });*/

    this.operariosService.getOperarios().subscribe((value) => {
      this.operarios = value;
    });
  }

  handlePausedBtn(data: any) {
    console.log(data)
  }
}

@NgModule({
  declarations: [AsignacionRecursosComponent],
  imports: [
    DxDataGridModule,
    OrderInfoAreaModule,
    DxDropDownButtonModule,
    DxTextBoxModule,
    DxButtonModule,
    DxPopupModule,
    DxToolbarModule,
    DxDropDownBoxModule,
  ],
  providers: [TransaccionRecursosService, OperarioService],
  exports: [AsignacionRecursosComponent],
})
export class AsignacionRecursosModule {}
