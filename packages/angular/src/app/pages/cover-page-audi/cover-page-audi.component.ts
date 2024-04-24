import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxDropDownBoxModule,
} from 'devextreme-angular';
import { TituloPaginaModule } from 'src/app/components/activesoft/titulo-pagina/titulo-pagina.component';
import { Planta } from 'src/app/types/planta';
import { SelectionChangedEvent } from 'devextreme/ui/data_grid';
import { OrderService } from 'src/app/services/order-service';
import { PlantaService } from 'src/app/services/planta.service';
import { OptionChangedEvent } from 'devextreme/ui/drop_down_box';
import { Batch } from 'src/app/types/Batch';
import { CommonModule } from '@angular/common';
import { ClickEvent } from 'devextreme/ui/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cover-page-audi',
  templateUrl: './cover-page-audi.component.html',
  styleUrls: ['./cover-page-audi.component.scss'],
})
export class CoverPageAudiComponent implements OnInit {
  @ViewChild('plantaDataGrid') plantaDataGrid: DxDataGridComponent;
  placeholderPlanta: string = 'Seleccione una planta';
  placeholderOrden: string = 'Seleccione una orden';
  plantas: Planta[] = [];
  gridBoxValue = [];
  displayExpr = ({ id, nombre }) => `<${id}-${nombre}>`;
  gridColumns = ['id', 'nombre'];
  value: any;
  orders: any[];
  gridBoxValueComOrd = [];
  displayExprComOrd = ({ idCompro, numero }) =>
    `Compro: ${idCompro} - Ord: ${numero}`;
  gridColumnsComOrd = ['idCompro', 'numero'];
  fechaInicial: Date;
  now: Date = new Date();
  fechaFinal: Date;
  idPlanta: string;
  isPlantaGridOpened: boolean = false;
  isComOrdGridOpened: boolean = false;
  irA: string = '';
  batchSource: Batch[] = [
    {
      documento: 'Orden de Produccion',
      area: 'Produccion',
      estado: 'terminado',
      operario: {
        id: '0001',
        name: 'Jose',
      },
    },
    {
      documento: 'Despeje Inicial',
      area: 'Produccion',
      estado: 'pendiente',
      operario: {
        id: '0002',
        name: 'Nelson',
      },
    },
    {
      documento: 'Despeje Final',
      area: 'Produccion',
      estado: 'pendiente',
      operario: {
        id: '0003',
        name: 'Mario',
      },
    },
    {
      documento: 'Rotulo',
      area: 'Calidad',
      estado: 'pendiente',
      operario: {
        id: '0004',
        name: 'Juan',
      },
    },
    {
      documento: 'Instructivo Fabricacion',
      area: 'Produccion',
      estado: 'pendiente',
      operario: {
        id: '0005',
        name: 'David',
      },
    },
    {
      documento: 'Controles en Proceso',
      area: 'Direccion Tecnica',
      estado: 'pendiente',
      operario: {
        id: '0006',
        name: 'Pedro',
      },
    },
    {
      documento: 'Inspeccion del Producto Terminado',
      area: 'Calidad',
      estado: 'pendiente',
      operario: {
        id: '0007',
        name: 'Javier',
      },
    },
    {
      documento: 'Certificado de Calidad del Producto Terminada',
      area: 'Direccion tecnica',
      estado: 'pendiente',
      operario: {
        id: '0008',
        name: 'Jairo',
      },
    },
  ];
  compro: any;
  numero: any;
  planta: any;

  constructor(
    private plantaService: PlantaService,
    private orderService: OrderService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.fechaInicial = new Date(2023, 0, 1);
    const { anio, mes, dia } = {
      anio: this.now.getFullYear(),
      mes: this.now.getMonth(),
      dia: this.now.getDate(),
    };
    console.log(mes);
    this.fechaFinal = new Date(anio, mes, dia);
  }
  ngOnInit(): void {
    this.plantaService.getPlantas().subscribe((plantas) => {
      this.plantas = plantas;
    });
    this.activatedRouter.queryParams.subscribe(params=>{
      this.compro = params['compro'];
      this.numero = params['numero'];
      this.idPlanta = params['planta'];
    })
  }

  handlePlantaSeleccionada(plantaSeleccionada: SelectionChangedEvent) {
    const { selectedRowKeys } = plantaSeleccionada;
    this.idPlanta = selectedRowKeys[0];
    if (this.idPlanta) {
      this.orderService
        .get(this.fechaInicial, this.fechaFinal, this.idPlanta)
        .subscribe((ordenes) => {
          this.orders = ordenes;
        });
    }
  }

  handleOptionChangedPlanta(optionChanged: OptionChangedEvent) {
    if (optionChanged.value) {
      this.isPlantaGridOpened = false;
    }
  }

  handleOptionChangedComOrd(optionChanged: OptionChangedEvent) {
    if (optionChanged.value) {
      this.isComOrdGridOpened = false;
    }
  }

  handleClickIrButton(event: ClickEvent, ir: any) {
    const { data: { documento } } = ir;
    switch(documento.trim()){
      case 'Orden de Produccion': this.irA = 'orden'; break;
      case 'Despeje Inicial':  this.irA = "despeje-linea-inicial"; break;
      case 'Despeje Final': this.irA = 'despeje-linea-final'; break;
      case 'Rotulo': this.irA = 'impresion-rotulo'; break;
      case 'Instructivo Fabricacion':  this.irA = 'instructivo-fab'; break;
      case 'Controles en Proceso': this.irA = 'controles-en-proceso'; break;
      case 'Inspeccion del Producto Terminado': this.irA = 'inspeccion-producto-terminado'; break;
      case 'Certificado de Calidad del Producto Terminada': this.irA = 'certificado-calidad-page'; break;
    }
    this.router.navigate([this.irA], {
      queryParams: {
        compro: this.compro,
        numero: this.numero,
        planta: this.idPlanta,
      }
    });
  }

  handleOnSelectionChangedComOrd(event: SelectionChangedEvent) {
    const { selectedRowsData } = event; 
    if(selectedRowsData[0]){
      const { idCompro, numero } = selectedRowsData[0];
      this.compro = idCompro;
      this.numero = numero;
    } 
  }
}

@NgModule({
  declarations: [CoverPageAudiComponent],
  imports: [
    TituloPaginaModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxButtonModule,
    CommonModule
  ],
  providers: [OrderService, PlantaService],
  exports: [CoverPageAudiComponent],
})
export class CoverPageAudiModule {}
