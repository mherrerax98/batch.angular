import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { AsignacionRecursosModule } from 'src/app/components/activesoft/asignacion-recursos/asignacion-recursos.component';
import { DespejeFinalLineaModule } from 'src/app/components/activesoft/despeje-final-linea/despeje-final-linea.component';

@Component({
  selector: 'app-despeje-linea-final',
  templateUrl: './despeje-linea-final.component.html',
  styleUrls: ['./despeje-linea-final.component.scss'],
})
export class DespejeLineaFinalComponent implements OnInit {

  editable: boolean;
  operacion?: string ;
  numOrd: any;
  idCompro: any;
  idPlanta: any;

  constructor(private router: Router, private activateRoute: ActivatedRoute){
    this.editable = true;
  }
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
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

  handleAceptarButton(): void {
    this.router.navigate(['operacion-proceso-page']);
  }
}

@NgModule({
  declarations: [DespejeLineaFinalComponent],
  imports: [
    DxButtonModule,
    CommonModule,
    DespejeFinalLineaModule,
    AsignacionRecursosModule,
  ],
  providers: [],
  exports: [DespejeLineaFinalComponent],
})
export class DespejeLineaFinalModule {}
