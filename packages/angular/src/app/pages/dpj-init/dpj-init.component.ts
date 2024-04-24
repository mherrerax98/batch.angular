import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DxDataGridModule, DxTextBoxModule } from 'devextreme-angular';
import { DespejeLineaInicialModule } from 'src/app/components/activesoft/despeje-linea-inicial/despeje-linea-inicial.component';
import { OrderInfoAreaModule } from 'src/app/components/activesoft/order-info-area/order-info-area.component';
import { TituloPaginaModule } from 'src/app/components/activesoft/titulo-pagina/titulo-pagina.component';
import { ToolbarDespejeResponsableModule } from 'src/app/components/activesoft/toolbar-despeje-responsable/toolbar-despeje-responsable.component';
import { DespejeLineaService } from 'src/app/services/despeje-linea.service';
import { ProDespejeOrdenService } from 'src/app/services/prodespeje.orden.service';
import { DespejeLinea } from 'src/app/types/despeje';
import { ItemDespeje } from 'src/app/types/itemDespeje';
import { Operacion } from 'src/app/types/operacion';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { error } from 'console';
import { Inspeccion } from 'src/app/types/inspeccion';
import notify from 'devextreme/ui/notify';

const TIPO_DESPEJE: string = 'DLI';

@Component({
  selector: 'app-dpj-init',
  templateUrl: './dpj-init.component.html',
  styleUrls: ['./dpj-init.component.scss'],
})
export class DpjInitComponent implements OnInit {
  compro: string;
  numero: number;
  planta: string;
  items: ItemDespeje[];
  dataSource: any[] = [];
  operacion: string;
  inspeccion: Inspeccion;
  realizadoPor: string = '';
  verificadoPor: string = '';
  to: string;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private proDespejeOrdenService: ProDespejeOrdenService
  ) {}
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
      this.compro = params['compro'];
      this.numero = params['numero'];
      this.planta = params['planta'];
    });
  }

  private getItems() {
    this.realizadoPor = '';
    this.verificadoPor = '';
    this.dataSource = [];
    this.proDespejeOrdenService
      .get(this.compro, this.numero, this.operacion, 1)
      .pipe(
        catchError((error) => {
          console.error('Se ha producido un error:', error);
          notify({ message: "No existe despeje registrado para está operación", width: 'auto', shading: true , type: 'info'}, {position: 'center'});
          return of();
        })
      )
      .subscribe((items) => {
        this.dataSource.push(...items);0
        this.proDespejeOrdenService
          .getInspeccion(this.compro, this.numero, this.operacion, 1)
          .pipe(
            catchError((error) => {
              console.error('Se ha producido un error:', error);
              this.inspeccion = undefined;
              return of();
            })
          )
          .subscribe((inspeccion) => {
            this.inspeccion = inspeccion;
            console.log(inspeccion);
            this.realizadoPor =
              inspeccion.realizador.id + '-' + inspeccion.realizador.name;
            this.verificadoPor =
              inspeccion.verificador.id + '-' + inspeccion.verificador.name;
          });
      });
  }

  handleOnSelectionOperacion(operacion: Operacion) {
    const { idOperacion } = operacion;
    this.operacion = idOperacion;
    this.getItems();
  }

  handleNavigateTo() {
    this.router.navigate(['cover-page'], {
      queryParams: {
        planta: this.planta,
        numero: this.numero,
        compro: this.compro,
      },
    });
  }
}

@NgModule({
  declarations: [DpjInitComponent],
  imports: [
    TituloPaginaModule,
    OrderInfoAreaModule,
    DespejeLineaInicialModule,
    DxDataGridModule,
    CommonModule,
    DxTextBoxModule,
  ],
  exports: [DpjInitComponent],
  providers: [ProDespejeOrdenService],
})
export class DpjInitModule {}
