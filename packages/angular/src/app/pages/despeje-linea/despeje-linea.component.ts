import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DxButtonModule,
  DxDataGridModule,
  DxPopupModule,
} from 'devextreme-angular';
import { ClickEvent } from 'devextreme/ui/button';
import { AsignacionRecursosModule } from 'src/app/components/activesoft/asignacion-recursos/asignacion-recursos.component';
import { DespejeLineaInicialModule } from 'src/app/components/activesoft/despeje-linea-inicial/despeje-linea-inicial.component';
import { TituloPaginaModule } from 'src/app/components/activesoft/titulo-pagina/titulo-pagina.component';
import { DespejeLinea } from 'src/app/types/despeje';

@Component({
  selector: 'app-despeje-linea',
  templateUrl: './despeje-linea.component.html',
  styleUrls: ['./despeje-linea.component.scss'],
})
export class DespejeLineaComponent implements OnInit {
  editable: boolean = true;
  items: DespejeLinea[];
  operacion: string | null;
  numOrd: any;
  idCompro: any;
  idPlanta: any;
  enableOp: boolean = true;
  titulo: string = 'Despeje inicial';

  constructor(private router: Router, private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
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
  }

  openedOperation: boolean = false;
  operation: string;

  handleOnClickOperation(event: ClickEvent, data: any): void {
    this.openedOperation = !this.openedOperation;
    this.operation = 'dli';
    console.log(data);
  }

  handleOnClickAR(event: ClickEvent, data: any): void {
    this.openedOperation = !this.openedOperation;
    this.operation = 'ar';
  }

  handleOnClickVolver() {
    this.router.navigate(['portada'], {
      queryParams: {
        editable: 'n',
        planta: this.idPlanta,
        numord: this.numOrd,
        compro: this.idCompro,
      }
    });
  }
}

@NgModule({
  declarations: [DespejeLineaComponent],
  imports: [
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    CommonModule,
    DespejeLineaInicialModule,
    AsignacionRecursosModule,
    DxButtonModule,
    TituloPaginaModule,
  ],
  providers: [],
  exports: [DespejeLineaComponent],
})
export class DespejeLineaModule {}
