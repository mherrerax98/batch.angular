import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DxButtonGroupModule,
  DxButtonModule,
  DxDataGridModule,
  DxFormComponent,
  DxFormModule,
  DxPopupModule,
} from 'devextreme-angular';
import { ItemClickEvent } from 'devextreme/ui/drop_down_button_types';
import { OrderInfoAreaModule } from 'src/app/components/activesoft/order-info-area/order-info-area.component';
import { ToolbarControlesEnProcesoModule } from 'src/app/components/activesoft/toolbar-controles-en-proceso/toolbar-controles-en-proceso.component';

@Component({
  selector: 'app-controles-en-proceso-acondicionamiento',
  templateUrl: './controles-en-proceso-acondicionamiento.component.html',
  styleUrls: ['./controles-en-proceso-acondicionamiento.component.scss'],
})
export class ControlesEnProcesoAcondicionamientoComponent implements OnInit {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;

  enabledForm: boolean;
  editable: boolean;
  proceso: string;
  estado: string;

  acondicionamientoDataSource: any[] = [
    {
      id: 1,
      fecha: '27/03/2023',
      hora: '14:20',
      proceso: 'Codificado',
      estado: 'cumple',
      verificacion: 'C',
      realizadoPor: 'Pedro',
      codigoOp: '010101',
    },
    {
      id: 2,
      fecha: '27/03/2023',
      hora: '14:20',
      proceso: 'Empacado',
      estado: 'No Cumple',
      verificacion: 'NC',
      realizadoPor: 'Juan',
      codigoOp: '020202',
    },
  ];

  defaultFormDataSource: any[] = [
    {
      proceso: '',
      estado: '',
    },
  ];

  procesoList = [
    'Seleccionado',
    'Etiquetado',
    'Empacado',
    'Limpiado',
    'Codificado',
    'Sellado',
    'Termoencogido',
    'Embalado',
    'Sticker Colocado',
    'Otro',
  ];

  verificacion = ['Cumple', 'No Cumple'];

  editorOptionsProceso = {
    items: this.procesoList,
    width: '100%',
    useSelectMode: true,
    selectedItem: 0,
    stylingMode: 'text',
    onItemClick: (itemClickEvent: ItemClickEvent) => {
      this.proceso = itemClickEvent.itemData;
    },
  };

  editorOptionsVerificacion = {
    items: this.verificacion,
    width: '100%',
    useSelectMode: true,
    selectedItem: 0,
    stylingMode: 'text',
    onItemClick: (itemClickEvent: ItemClickEvent) => {
      this.estado = itemClickEvent.itemData;
    },
  };

  visibleRecibido: boolean;
  editorCantidadRecibidaOpts: any = {
    disabled: true,
    type: 'number',
    text: '00000',
  };
  recibidoDS: any[] = [
    {
      cantidadRecibida: '',
    },
  ];

  operacion: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.enabledForm = false;
    this.editable = true;
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.operacion = params['operacion'];
      const editable = params['editable'];
      this.editable = editable == 'n'? false: true;
    })
  }

  handleGuardarBtn() {
    this.enabledForm = !this.enabledForm;
    const date = new Date();
    this.acondicionamientoDataSource.push({
      id: this.acondicionamientoDataSource.length + 1,
      fecha: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      hora: `${date.getHours()}:${date.getMinutes()}`,
      proceso: this.proceso,
      estado: this.estado,
      verificacion: this.estado == 'Cumple' ? 'C' : 'NC',
      realizadoPor: 'Juan',
      codigoOp: '020202',
    });
  }

  handleAgregarControl() {
    this.enabledForm = !this.enabledForm;
    this.form.instance.clear();
  }

  handleRecibirBtn() {
    this.visibleRecibido = !this.visibleRecibido;
  }

  handleAceptarRecibido() {
    this.visibleRecibido = !this.visibleRecibido;
  }

}

@NgModule({
  declarations: [ControlesEnProcesoAcondicionamientoComponent],
  imports: [
    DxDataGridModule,
    DxButtonModule,
    DxFormModule,
    DxPopupModule,
    OrderInfoAreaModule,
    CommonModule,
    DxButtonGroupModule
  ],
  providers: [],
  exports: [ControlesEnProcesoAcondicionamientoComponent],
})
export class ControlesEnProcesoAcondicionamientoModule {}
