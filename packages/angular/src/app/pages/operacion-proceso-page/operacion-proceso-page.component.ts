import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { ClickEvent } from 'devextreme/ui/button';
import { OperacionProcesoModule } from 'src/app/components/activesoft/operacion-proceso/operacion-proceso.component';
import { OrderInfoAreaModule } from 'src/app/components/activesoft/order-info-area/order-info-area.component';
import { TituloPaginaModule } from 'src/app/components/activesoft/titulo-pagina/titulo-pagina.component';
import { OperacionService } from 'src/app/services/operacion.service';

@Component({
  selector: 'app-operacion-proceso-page',
  templateUrl: './operacion-proceso-page.component.html',
  styleUrls: ['./operacion-proceso-page.component.scss'],
})
export class OperacionProcesoPageComponent implements OnInit {
  operacion: string = null;
  planta: string;
  orden: { idCompro: string; numero: number };
  idCompro: string;
  numero: number;
  titulo: string = 'Ruta de producción';
  dataSource: any[] = [];
  operacionId: any;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private operacionService: OperacionService
  ) {}

  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe((params) => {
      this.operacion = params['operacion'];
      this.numero = params['numord'];
      this.idCompro = params['compro'];
      this.planta = params['planta'];
    });
  }

  handleAceptarButton(): void {
    this.router.navigate(['batch-record-etapas-list']);
  }

  handleOnSelectionChanged(planta: string) {
    this.planta = planta;
  }

  handleOnSelectionChangedComOrd(orden: { idCompro: string; numero: number }) {
    if (orden) {
      this.orden = orden;
      console.log(orden);
      this.getOperacines();
    }
  }

  handleOnValueChangedComOrd(valueChanged: any) {
    if (!valueChanged) {
      this.orden = null;
      this.dataSource = [];
    }
  }

  handleVolver() {
    this.router.navigate(['ruta-prod']);
  }

  handleOnClick(event: ClickEvent, action: any): void {
    const {
      columnIndex,
      rowIndex,
      data: { operacion, operacionId },
    } = action;
    this.operacion = operacion;
    this.operacionId = operacionId;
    const navigateTo = this.navigateTo(columnIndex, rowIndex);
    this.router.navigate([navigateTo], {
      queryParams: {
        editable: 'n',
        planta: this.planta,
        numord: this.orden.numero,
        compro: this.orden.idCompro,
        operacion: this.operacion,
        operacionId: this.operacionId,
        desde: 'ruta-prod',
      },
    });
  }

  getOperacines() {
    this.operacionService
      .getOperacionRuta(this.orden.idCompro, this.planta, this.orden.numero)
      .subscribe((operaciones) => {
        operaciones.forEach((operacion) => {
          console.log(operaciones);
          this.dataSource.push({
            operacion: operacion.nombre,
            operacionId: operacion.idOperacion,
            dli: 'terminado',
            dlf: 'en proceso',
            tRec: 'pendiente',
            ctlPrcs: 'en proceso',
          });
        });
      });
  }

  navigateTo(columnIndex, rowIndex) {
    if (columnIndex == 1) return 'despeje-linea';
    else if (columnIndex == 3) return 'despeje-final';
    else if (columnIndex == 5) return 'asignacion-recursos-page';
    else if (columnIndex == 7) {
      if (rowIndex == 0) return 'controles-en-proceso';
      else if (rowIndex == 1) return 'controles-en-procso-acondicionamiento';
    }
    return '';
  }

  handleOnOptionComOrdChanged(event: any) {
    console.log(event);
    if(event == true){
      this.dataSource = [];
    }
  }

  
handleOnValuePlantaChanged(event: any) {
  if(!event) this.dataSource = [];
  }
}

@NgModule({
  declarations: [OperacionProcesoPageComponent],
  imports: [
    OperacionProcesoModule,
    DxButtonModule,
    OrderInfoAreaModule,
    TituloPaginaModule,
    DxDataGridModule,
    CommonModule,
  ],
  providers: [OperacionService],
  exports: [OperacionProcesoPageComponent],
})
export class OperacionProcesoPageModule {}
