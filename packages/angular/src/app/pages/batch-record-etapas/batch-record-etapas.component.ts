import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { ClickEvent } from 'devextreme/ui/button';
import { OrderInfoAreaModule } from 'src/app/components/activesoft/order-info-area/order-info-area.component';
import { OperarioService } from 'src/app/services/operario.service';
import { Operario } from 'src/app/types/operario';

@Component({
  templateUrl: './batch-record-etapas.component.html',
  styleUrls: ['./batch-record-etapas.component.scss'],
})
export class BatchRecordEtapasComponent implements OnInit {
  batchRecordDataSource: any[] = [
    {
      documentos: 'Orden de Produccion',
      encargado: 'Produccion',
      estado: 'terminado',
      actions: '',
      responsable: 'Nelson',
      codigo: '000001',
    },
    {
      documentos: 'Despeje Inicial',
      encargado: 'Produccion',
      estado: 'pendiente',
      actions: '',
      responsable: 'Jose',
      codigo: '101010',
    },

    {
      documentos: 'Despeje Final',
      encargado: 'Produccion',
      estado: 'pendiente',
      actions: '',
      responsable: 'Jose',
      codigo: '101010',
    },
    {
      documentos: 'Rotulo',
      encargado: 'Calidad',
      estado: 'pendiente',
      actions: '',
      responsable: 'Jairo',
      codigo: '060606',
    },
    {
      documentos: 'Instructivo Fabricacion',
      encargado: 'Produccion',
      estado: 'pendiente',
      actions: '',
      responsable: 'Julio',
      codigo: '070707',
    },
    {
      documentos: 'Controles en Proceso',
      encargado: 'Direccion Tecnica',
      estado: 'pendiente',
      actions: '',
      responsable: 'Luis',
      codigo: '202020',
    },
    {
      documentos: 'Inspeccion del Producto Terminado',
      encargado: 'Calidad',
      estado: 'pendiente',
      actions: '',
      responsable: 'Mario',
      codigo: '303030',
    },
    {
      documentos: 'Certificado de Calidad del Producto Terminada',
      encargado: 'Direccion tecnica',
      estado: 'pendiente',
      actions: '',
      responsable: 'Juan',
      codigo: '404040',
    },
  ];

  numOrd: number;
  idCompro: string;
  idPlanta: string;
  editable: boolean;
  operarios: Operario[];

  constructor(
      private router: Router, 
      private activateRoute: ActivatedRoute,
      private operarioService: OperarioService
    ) {
    this.editable = true;
  }

  ngOnInit(): void {
    this.operarioService.getOperarios().subscribe(operarios => {
      this.operarios = operarios;
    });

    this.activateRoute.queryParams.subscribe((params) => {
      // Aquí puedes acceder a los valores de los parámetros
      const editable = params['editable'];
      const numOrd = params['numord'];
      const idCompro = params['compro'];
      const planta = params['planta'];
      if (editable == 'n') {
        this.editable = false;
        this.numOrd = numOrd;
        this.idCompro = idCompro;
        this.idPlanta = planta;
      }
    });
  }

  handleOnClick(e: ClickEvent, action: any) {
    const { columnIndex, rowIndex } = action;

    let goTo: string = '';
    if (columnIndex == 5) {
      switch (rowIndex) {
        case 0:
          goTo = 'orden';
          break;
        case 1:
          goTo = 'despeje-linea';
          break;
        case 2:
          goTo = goTo = 'despeje-final';
          break;
        case 3:
          goTo = 'impresion-rotulo';
          break;
        case 4:
          goTo = 'instructivo-fab';
          break;
        case 5:
          goTo = 'controles-en-proceso';
          break;
        case 6:
          goTo = 'inspeccion-producto-terminado';
          break;
        case 7:
          goTo = 'certificado-calidad-page';
          break;
        default:
          goTo = '';
          break;
      }
    }
    this.router.navigate([goTo], {
      queryParams: {
        editable: 'n',
        planta: this.idPlanta,
        numord: this.numOrd,
        compro: this.idCompro,
      },
    });
  }

  handleAceptarButton(): void {
    this.router.navigate(['order-list']);
  }
}

@NgModule({
  declarations: [BatchRecordEtapasComponent],
  imports: [
    DxDataGridModule,
    DxButtonModule,
    OrderInfoAreaModule,
    CommonModule,
  ],
  providers: [OperarioService],
  exports: [BatchRecordEtapasComponent],
})
export class BatchRecordEtapasModule {}
