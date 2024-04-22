import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular';
import { OperacionProcesoModule } from 'src/app/components/activesoft/operacion-proceso/operacion-proceso.component';
import { OrderInfoAreaModule } from 'src/app/components/activesoft/order-info-area/order-info-area.component';
import { TituloPaginaModule } from 'src/app/components/activesoft/titulo-pagina/titulo-pagina.component';

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

  constructor(private router: Router, private activedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe((params) => {
      this.operacion = params['operacion'];
      this.numero = params['numord'];
      this.idCompro = params['compro'];
      this.planta = params['planta']
    });
  }

  handleAceptarButton(): void {
    this.router.navigate(['batch-record-etapas-list']);
  }

  handleOnSelectionChanged(planta: string) {
    this.planta = planta;
  }

  handleOnSelectionChangedComOrd(orden: { idCompro: string; numero: number }) {
    this.orden = orden;
  }

  handleOnValueChangedComOrd(valueChanged: any) {
    if (!valueChanged) {
      this.orden = null;
    }
  }

  handleVolver() {
    this.router.navigate(['ruta-prod'])
  }
}

@NgModule({
  declarations: [OperacionProcesoPageComponent],
  imports: [
    OperacionProcesoModule,
    DxButtonModule,
    OrderInfoAreaModule,
    TituloPaginaModule,
  ],
  providers: [],
  exports: [OperacionProcesoPageComponent],
})
export class OperacionProcesoPageModule {}
