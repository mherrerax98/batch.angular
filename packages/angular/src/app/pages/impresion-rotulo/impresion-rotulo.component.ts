import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderInfoAreaModule } from 'src/app/components/activesoft/order-info-area/order-info-area.component';
import { PrintRotuloModule } from 'src/app/components/activesoft/print-rotulo/print-rotulo.component';
import { ToolbarDespejeResponsableModule } from 'src/app/components/activesoft/toolbar-despeje-responsable/toolbar-despeje-responsable.component';
import { ToolbarPrintRotuloModule } from 'src/app/components/activesoft/toolbar-print-rotulo/toolbar-print-rotulo.component';
import { Operario } from 'src/app/types/operario';

@Component({
  selector: 'app-impresion-rotulo',
  templateUrl: './impresion-rotulo.component.html',
  styleUrls: ['./impresion-rotulo.component.scss']
})
export class ImpresionRotuloComponent implements OnInit {
  editable: boolean = true;
  numOrd: any;
  idCompro: any;
  idPlanta: any;

  constructor(private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
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
    });
  }

  handleSelectedOperarios(event: Operario[]) {
    
  }
}

@NgModule({
  declarations: [ImpresionRotuloComponent],
  imports: [PrintRotuloModule, OrderInfoAreaModule, ToolbarDespejeResponsableModule],
  providers: [],
  exports: [ImpresionRotuloComponent]
})
export class ImpresionRotuloModule {}