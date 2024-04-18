import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxDropDownBoxModule,
  DxDropDownButtonModule,
  DxFormComponent,
  DxFormModule,
  DxPopupModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import {
  SavedEvent,
  SelectionChangedEvent,
} from 'devextreme/ui/data_grid';
import { EnterKeyEvent } from 'devextreme/ui/tag_box_types';
import { OrderInfoAreaModule } from 'src/app/components/activesoft/order-info-area/order-info-area.component';
import { ToolbarControlesEnProcesoModule } from 'src/app/components/activesoft/toolbar-controles-en-proceso/toolbar-controles-en-proceso.component';
import { OperarioService } from 'src/app/services/operario.service';
import { Operario } from 'src/app/types/operario';

@Component({
  selector: 'app-controles-en-proceso',
  templateUrl: './controles-en-proceso.component.html',
  styleUrls: ['./controles-en-proceso.component.scss'],
})
export class ControlesEnProcesoComponent implements OnInit {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  @ViewChild('controlProcesoDataGrid')
  controlProcesoDataGrid: DxDataGridComponent;

  visibleEntrega: boolean;
  editable: boolean;
  enabledForm: boolean;
  operacion?: string;
  medicion = ['Peso', 'Volumen'];
  producto = 'DL00000007';
  volumenPeso: string;
  densidad: string;
  minimo: string;
  promedio: string;
  maximo: string;

  envasadoDataSource: {
    __KEY__: number,
    fecha: Date;
    hora: string;
    realizadoPor: string;
    resultado: number;
    cumple: string;
  }[] = [];

  editorOptionsValor = {
    onEnterKey: (enterKeyEvent: EnterKeyEvent) => {
      console.log(enterKeyEvent);
    },
  };

  defaultFormDataSource: any[] = [
    {
      valor: '',
    },
  ];

  medidas: string[] = ['peso', 'volumen'];

  editorOptionsRadioGroup = {
    items: this.medidas,
  };

  entregaDataSource: any[] = [
    {
      codigoEntrega: '',
      nombreEntrega: '',
      procesoEntrega: '',
      codigoRecibe: '',
      nombreRecibe: '',
      procesoRecibe: '',
      cantidadEntrega: '',
    },
  ];

  editorCodigoEntregaOptions: any = {
    items: ['4567', '2245'],
    useSelectMode: true,
    width: '100%',
    title: 'Entrega',
  };

  editorProcesoEntregaOptions: any = {
    width: '100%',
    text: 'Envase',
    disabled: true,
  };

  editorRecibeOptions: any = {
    items: ['', 'Acondicionado'],
    useSelectMode: true,
    width: '100%',
  };
  editorEntregaOptions: any = {
    text: 'Quien Entrega',
    disabled: true,
  };
  editorNombreRecibeOptions: any = {
    text: 'Quien recibe',
    disabled: true,
  };
  editorCodigoRecibeOptions: any = {
    items: ['4567', '2245'],
    useSelectMode: true,
    width: '100%',
    title: 'Entrega',
  };

  editorCantidadEntregaOptions: any = {};
  displayExpr = ({ id, name }) => `<${id}-${name}>`;
  operarios: Operario[];
  gridBoxValue = [];
  gridColumns: string[] = ['id', 'name'];
  numOrd: any;
  idCompro: any;
  idPlanta: any;

  constructor(
    private acivateRoute: ActivatedRoute,
    private operarioService: OperarioService
  ) {
    this.editable = true;
    this.enabledForm = false;
  }

  handleAgregarControl() {
    // this.enabledForm = !this.enabledForm;
    // this.form.instance.clear();
    this.controlProcesoDataGrid.instance.addRow();
  }

  handleGuardarBtn() {
    this.enabledForm = !this.enabledForm;
    const date = new Date();
  }

  handleEntregaBtn() {
    this.visibleEntrega = !this.visibleEntrega;
  }

  handleEntregarOk() {
    this.visibleEntrega = !this.visibleEntrega;
  }

  handleEntregarCancel() {
    this.visibleEntrega = !this.visibleEntrega;
  }

  ngOnInit(): void {
    this.acivateRoute.queryParams.subscribe((params) => {
      // Aquí puedes acceder a los valores de los parámetros
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

    this.operarioService.getOperarios().subscribe((value) => {
      this.operarios = value;
    });
  }

  handleSelectionVerificadoPor($event: SelectionChangedEvent) {}

  handleSaved(event: SavedEvent) {
    const { changes } = event;
    const change = changes[0];
    if(change){
      const { data } = change;
      const { __KEY__ } = data;
      const now = new Date();
      const hora = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`
      const date = `${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2,'0')}/${now.getDate().toString().padStart(2,'0')}` 
      this.controlProcesoDataGrid.instance.getDataSource().store().update(__KEY__, {
        fecha: date,
        cumple: 'N',
        hora 
      });
    }
  }
}

@NgModule({
  declarations: [ControlesEnProcesoComponent],
  providers: [OperarioService],
  imports: [
    OrderInfoAreaModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxFormModule,
    CommonModule,
    ToolbarControlesEnProcesoModule,
    DxDropDownBoxModule,
    DxToolbarModule,
    DxTextBoxModule,
    DxDropDownButtonModule
  ],
  exports: [ControlesEnProcesoComponent],
})
export class ControlesEnProcesoModule {}
