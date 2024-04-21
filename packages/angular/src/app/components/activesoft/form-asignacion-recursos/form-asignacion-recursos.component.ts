import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDropDownBoxModule,
  DxDropDownButtonModule,
  DxFormModule,
  DxToolbarModule,
  DxTreeViewModule,
} from 'devextreme-angular';
import { SelectionChangedEvent } from 'devextreme/ui/data_grid';
import { ValueChangedEvent } from 'devextreme/ui/drop_down_box';
import * as DropDownButton from 'devextreme/ui/drop_down_button';
import { MaquinaService } from 'src/app/services/maquina.service';
import { OperarioService } from 'src/app/services/operario.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { TransaccionRecursosService } from 'src/app/services/transaccion.recursos.service';
import { Operario } from 'src/app/types/operario';
import { Product } from 'src/app/types/producto';
import { Recurso, ReqOperMaq } from 'src/app/types/recurso';
import { TransaccionDetalle } from 'src/app/types/transaccion';

@Component({
  selector: 'app-form-asignacion-recursos',
  templateUrl: './form-asignacion-recursos.component.html',
  styleUrls: ['./form-asignacion-recursos.component.scss'],
})
export class FormAsignacionRecursosComponent implements OnInit, OnChanges {
  @Input() compro: string;
  @Input() numero: number;
  @Input() operacion: string;
  @Output() onAddRegister: EventEmitter<Operario[]> = new EventEmitter<
    Operario[]
  >();
  @Output() onCalcelRegister: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Output() onSelectedProduct: EventEmitter<Product> =
    new EventEmitter<Product>();
  @Output() onSelectedRecurso: EventEmitter<string> =
    new EventEmitter<string>();

  operarios: Operario[];
  operariosSeleccionados: Operario[];
  habilitarRegistrarOperarios: boolean = false;
  gridBoxValue: string[] = [];
  gridBoxValueRecurso: string[] = [];
  gridColumns = ['id', 'name'];
  isGridBoxOpened: boolean = false;
  recursos: Recurso[];
  dataSource: any;
  products: Product[];

  constructor(
    private operarioService: OperarioService,
    private recursoService: RecursoService,
    private maquinaService: MaquinaService,
    private transaccionRecursosService: TransaccionRecursosService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    const { compro, numero, operacion } = changes;
    if (compro && numero) {
      console.log(compro, numero, operacion);
      if (compro.currentValue && numero.currentValue) {
        this.compro = compro.currentValue;
        this.numero = numero.currentValue;
        this.transaccionRecursosService
          .getProductos(this.compro, this.numero)
          .subscribe((value) => {
            this.products = value;
          });
      }
    }

    if (operacion) {
      if (operacion.currentValue) {
        console.log(this.compro, this.numero, operacion.currentValue)
        this.recursoService
          .getRecursos(this.compro, this.numero, operacion.currentValue, this.products[0].id)
          .subscribe((value) => {
            this.recursos = value;
          });
      }
    }
  }

  ngOnInit(): void {
    this.operarioService.getOperarios().subscribe((value) => {
      this.operarios = value;
    });
  }

  displayExpr = ({ id, name }) => `<${id}-${name}>`;

  handleAddRegisterBtn() {
    this.gridBoxValueRecurso = [];
    this.gridBoxValue = [];
    this.onAddRegister.emit(this.operariosSeleccionados);
  }

  handleCancelRegister() {
    this.gridBoxValueRecurso = [];
    this.gridBoxValue = [];
    this.onCalcelRegister.emit(false);
  }

  handleSelectionRow(event: SelectionChangedEvent) {
    const { selectedRowsData } = event;
    const recurso: Recurso | undefined = selectedRowsData?.at(0);
    if (recurso != undefined) {
      const { reqOper, reqMaq } = recurso;
      this.onSelectedRecurso.emit(recurso.idRecurso);
      if (reqOper == 'S') {
        this.operarioService.getOperarios().subscribe((value) => {
          this.dataSource = value;
        });
      } else if (reqMaq == 'S') {
        this.maquinaService.getMaquinas().subscribe((value) => {
          this.dataSource = value;
        });
      }
    }
  }

  handleSelectionOperMaq(event: SelectionChangedEvent) {
    const { selectedRowsData } = event;
    this.operariosSeleccionados = selectedRowsData;
  }

  handleOnSelectionChangedProducto(producto: DropDownButton.SelectionChangedEvent) {
    const { item } = producto;
    this.onSelectedProduct.emit(item as Product);
  }

  handleOnValueChangedRecurso(recurso: ValueChangedEvent) {
    const { value } = recurso;
    this.onSelectedRecurso.emit(value); 
  }
}

@NgModule({
  declarations: [FormAsignacionRecursosComponent],
  imports: [
    DxToolbarModule,
    DxDropDownButtonModule,
    DxTreeViewModule,
    DxDropDownBoxModule,
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxFormModule,
  ],
  providers: [
    OperarioService,
    RecursoService,
    MaquinaService,
    TransaccionRecursosService,
  ],
  exports: [FormAsignacionRecursosComponent],
})
export class FormAsignacionRecursosModule {}
