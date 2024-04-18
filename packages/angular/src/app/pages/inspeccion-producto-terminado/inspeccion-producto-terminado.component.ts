import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormComponent,
  DxFormModule,
  DxPopupModule,
} from 'devextreme-angular';
import { ProductoTerminado } from 'src/app/types/producto';
import { Entregas } from 'src/app/types/entregas';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderInfoAreaModule } from 'src/app/components/activesoft/order-info-area/order-info-area.component';

@Component({
  selector: 'app-inspeccion-producto-terminado',
  templateUrl: './inspeccion-producto-terminado.component.html',
  styleUrls: ['./inspeccion-producto-terminado.component.scss'],
})
export class InspeccionProductoTerminadoComponent implements OnInit {
  @ViewChild(DxFormComponent, { static: false}) myForm: DxFormComponent;

  editable: boolean;

  habilitarBtns: boolean;

  entregas: Array<Entregas> = [];

  productoTerminado: ProductoTerminado;

  operarios: { id: number; name: string }[] = [
    {
      id: 2123,
      name: 'Julio',
    },
    {
      id: 2123,
      name: 'Javier',
    },
  ];

  enabled: boolean;

  labelMode: string;

  labelLocation: string;

  readOnly: boolean;

  showColon: boolean;

  minColWidth: number;

  colCount: number;

  width: any;
  numOrd: any;
  idCompro: any;
  idPlanta: any;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.editable = true;
    this.habilitarBtns = true;
    this.labelMode = 'floating';
    this.labelLocation = 'left';
    this.readOnly = false;
    this.showColon = true;
    this.minColWidth = 300;
    this.colCount = 2;
    this.productoTerminado = {
      totalUnidadesAcondicionadas: 0,
      tamanioMuestra: 0,
      totalCajasCorrugadas: 0,
      corrugadosRevisar: 0,
      cantidadProductoRevisar: 0,
      unidadesNoConfirmadas: 0,
      defectoEncontrado: 0,
      concepto: '',
      realizadoPor: '',
      observacion: ''
    };
    this.entregas = new Array();
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
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
    })
  }

  handleAgregarEntrega(): void {
    this.enabled = !this.enabled;
    this.habilitarBtns = true;
    this.myForm.readOnly = false;
    this.productoTerminado = {
      totalUnidadesAcondicionadas: 0,
      tamanioMuestra: 0,
      totalCajasCorrugadas: 0,
      corrugadosRevisar: 0,
      cantidadProductoRevisar: 0,
      unidadesNoConfirmadas: 0,
      defectoEncontrado: 0,
      concepto: '',
      realizadoPor: '',
      observacion: ''
    };
  }

  handleGuardarEntrega(): void {
    console.log(this.productoTerminado);
    this.enabled = !this.enabled;
    this.myForm.instance.clear();
    this.entregas.push({
      numero: this.entregas.length + 1,
      responsable: 'operario',
      fecha: new Date()
    });
  }

  handleCancelarEntrega(): void {
    this.enabled = !this.enabled;
    this.myForm.instance.clear();
  }

  handleAceptarButton(): void {
    this.router.navigate(['batch-record-etapas-list']);
  }

  handleVerButton(): void {
    this.enabled = !this.enabled;
    this.habilitarBtns = false;
    this.myForm.readOnly = true;
    this.productoTerminado = {
      totalUnidadesAcondicionadas: 3344,
      tamanioMuestra: 207,
      totalCajasCorrugadas: 76,
      corrugadosRevisar: 9,
      cantidadProductoRevisar: 23,
      unidadesNoConfirmadas: 0,
      defectoEncontrado: null,
      concepto: 'cumple',
      realizadoPor: 'operario',
    };
  }

  handleSalirFormBoton(): void {
    this.enabled = !this.enabled;
  }
}

@NgModule({
  declarations: [InspeccionProductoTerminadoComponent],
  imports: [DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, OrderInfoAreaModule],
  providers: [],
  exports: [InspeccionProductoTerminadoComponent],
})
export class InspeccionProductoTerminadoModule {}
