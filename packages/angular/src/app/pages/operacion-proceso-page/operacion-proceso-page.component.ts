import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular';
import { OperacionProcesoModule } from 'src/app/components/activesoft/operacion-proceso/operacion-proceso.component';
import { OrderInfoAreaModule } from 'src/app/components/activesoft/order-info-area/order-info-area.component';

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

  constructor(private router: Router, private activedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe((params) => {
      this.operacion = params['operacion'];
      console.log(this.operacion);
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
    if(!valueChanged){
      this.orden = null;
    }
  }
}

@NgModule({
  declarations: [OperacionProcesoPageComponent],
  imports: [OperacionProcesoModule, DxButtonModule, OrderInfoAreaModule],
  providers: [],
  exports: [OperacionProcesoPageComponent],
})
export class OperacionProcesoPageModule {}
