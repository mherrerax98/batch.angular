import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  NgModule,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { ClickEvent } from 'devextreme/ui/button';
import { OperacionService } from 'src/app/services/operacion.service';

@Component({
  selector: 'app-operacion-proceso',
  templateUrl: './operacion-proceso.component.html',
  styleUrls: ['./operacion-proceso.component.scss'],
})
export class OperacionProcesoComponent implements OnChanges {
  @Input() planta;
  @Input() orden: { idCompro: string; numero: number };

  operacion: string | null = null;
  dataSource: any[] = [];

  operacionProcesoDataSource: any[] = [
    /*{
      operacion: 'Dispensacion',
      despejeLineaInicial: '',
      asignacionRecursos: '',
      control: '',
      despejeLineaFinal: '',
      estado: 'pendiente'
    },
    {
      operacion: 'Fabricacion',
      despejeLineaInicial: '',
      asignacionRecursos: '',
      control: '',
      despejeLineaFinal: '',
      estado: 'en proceso'
    },*/
    {
      operacion: 'Envase',
      despejeLineaInicial: '',
      asignacionRecursos: '',
      control: '',
      despejeLineaFinal: '',
      estado: 'pendiente',
    },
    {
      operacion: 'Acondicionamiento',
      despejeLineaInicial: '',
      asignacionRecursos: '',
      control: '',
      despejeLineaFinal: '',
      estado: 'terminado',
    },
  ];

  constructor(
    private router: Router,
    private operacionService: OperacionService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      const { planta, orden } = changes;
      if (planta) {
        if (planta.currentValue) {
          this.planta = planta.currentValue;
        }
      }
      if (orden) {
        if (orden.currentValue) {
          console.log(orden.currentValue);
          this.orden = orden.currentValue;
        }
      }
    }

    if (this.planta && this.orden) {
      this.operacionService
        .getOperacionRuta(this.orden.idCompro, this.planta, this.orden.numero)
        .subscribe((operaciones) => {
          operaciones.forEach((operacion)=>{
            this.dataSource.push({
              operacion: operacion.nombre,
              dli: 'terminado',
              dlf: 'en proceso',
              tRec: 'pendiente',
              ctlPrcs: 'en proceso',
            },)
          })
        });
    }else {
      this.dataSource = [];
    }
  }

  handleOnClick(event: ClickEvent, action: any): void {
    const {
      columnIndex,
      rowIndex,
      data: { operacion },
    } = action;
    this.operacion = operacion;
    console.log(this.operacion);
    const navigateTo = this.navigateTo(columnIndex, rowIndex);
    this.router.navigate([navigateTo], {
      queryParams: {
        editable: 'n',
        planta: this.planta,
        numord: this.orden.idCompro,
        compro: this.orden.numero,
        operacion: this.operacion,
      },
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
}

@NgModule({
  declarations: [OperacionProcesoComponent],
  imports: [DxDataGridModule, DxButtonModule, CommonModule],
  providers: [OperacionService],
  exports: [OperacionProcesoComponent],
})
export class OperacionProcesoModule {}
