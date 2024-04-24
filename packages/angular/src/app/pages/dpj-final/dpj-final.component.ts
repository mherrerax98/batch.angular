import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridModule, DxTextBoxModule } from 'devextreme-angular';
import { OrderInfoAreaModule } from 'src/app/components/activesoft/order-info-area/order-info-area.component';
import { TituloPaginaModule } from 'src/app/components/activesoft/titulo-pagina/titulo-pagina.component';
import { ProDespejeOrdenService } from 'src/app/services/prodespeje.orden.service';
import { Inspeccion } from 'src/app/types/inspeccion';
import { ItemDespeje } from 'src/app/types/itemDespeje';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Operacion } from 'src/app/types/operacion';
import { CommonModule } from '@angular/common';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-dpj-final',
  templateUrl: './dpj-final.component.html',
  styleUrls: ['./dpj-final.component.scss'],
})
export class DpjFinalComponent implements OnInit {
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
      .get(this.compro, this.numero, this.operacion, 2)
      .pipe(
        catchError((error) => {
          console.error('Se ha producido un error:', error);
          notify({ message: "No existe despeje registrado para está operación", width: 'auto', type: 'info'}, {position: 'center'});
          return of();
        })
      )
      .subscribe((items) => {
        this.dataSource.push(...items);
        this.proDespejeOrdenService
          .getInspeccion(this.compro, this.numero, this.operacion, 2)
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
  declarations: [DpjFinalComponent],
  imports: [
    DxDataGridModule,
    TituloPaginaModule,
    DxTextBoxModule,
    OrderInfoAreaModule,
    CommonModule,
  ],
  providers: [],
  exports: [DpjFinalComponent],
})
export class DpjFinalModule {}
