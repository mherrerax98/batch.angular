import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  DxAccordionModule,
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxDropDownButtonModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import {
  RowClickEvent,
  RowDblClickEvent,
  SelectionChangedEvent,
} from 'devextreme/ui/data_grid';
import { ChangeEvent, OptionChangedEvent, ValueChangedEvent } from 'devextreme/ui/date_box';
import { FormTextboxModule } from 'src/app/components';
import { PlantaDropDownBoxModule } from 'src/app/components/activesoft/planta-drop-down-box/planta-drop-down-box.component';
import { TextConColorModule } from 'src/app/components/activesoft/text-con-color/text-con-color.component';
import { OrderService } from 'src/app/services/order-service';
import { PlantaService } from 'src/app/services/planta.service';
import { Orders } from 'src/app/types/orders';
import { Planta } from 'src/app/types/planta';
import { ProductDetails } from 'src/app/types/producto';

@Component({
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  value: Date = new Date(1981, 3, 27);
  now: Date = new Date();
  min: Date = new Date(1900, 0, 1);
  orders: Orders[];
  enableInfoPanel: boolean;
  orderNumero: string = '';
  products: ProductDetails;
  fechaInicial: Date = new Date(this.now.getFullYear(), this.now.getMonth(), 1);
  fechaFinal: Date = this.now;
  plantas: Planta[] = [];
  gridBoxValue = [];
  displayExpr = ({ id, nombre }) => `<${id}-${nombre}>`;
  gridColumns = ['id', 'nombre'];
  idPlanta: string;

  constructor(
    private router: Router,
    private ordersService: OrderService,
    private plantaService: PlantaService
  ) {}

  ngOnInit(): void {
    try {
      // this.ordersService
      //   .getOrders(this.fechaInicial, this.fechaFinal)
      //   .subscribe((value: Orders[]) => {
      //     this.orders = value;
      //   });

      this.plantaService.getPlantas().subscribe((plantas) => {
        this.plantas = plantas;
      });
    } catch (error) {
      console.error();
    }
  }

  handleClickBtn(order: any): void {
    const { data: { numero, idCompro } } = order;
    this.router.navigate(['batch-record-etapas-list'], {
      queryParams: { editable: 'n', planta: this.idPlanta, numord: numero, compro: idCompro },
    });
  }

  handleRowClick(rowClickEvent: RowClickEvent) {
    this.enableInfoPanel = true;
    const { data } = rowClickEvent;
    const { idPrdPadre, cantidad, lote, numero, fecExpira, nombre } = data;
    this.products = { idPrdPadre, cantidad, lote, fecExpira, nombre };
    this.orderNumero = numero;
  }

  handleEnablePanelInfo() {
    this.enableInfoPanel = false;
  }

  handleBuscarPorFecha() {
    try {
      this.ordersService
        .getOrders(this.fechaInicial, this.fechaFinal, this.idPlanta)
        .subscribe((value: Orders[]) => {
          this.orders = value;
        });
    } catch (error) {
      console.error();
    }
  }

  handleValueChangedFechaInit(event: ValueChangedEvent) {
    const { value } = event;
    this.fechaInicial = new Date(value);
  }

  handleValueChangedFechaFinal(event: ValueChangedEvent) {
    const { value } = event;
    this.fechaFinal = new Date(value)
    console.log(this.fechaFinal.toISOString())
  }


  handleOnSelectionChanged(planta: string) {
    console.log(this.fechaInicial, '---', this.fechaFinal);
    if(planta){
      this.idPlanta = planta;
    }else {
      this.orders = [];
    }
  }

  
handleOptionChangedFI(event: OptionChangedEvent) {
  console.log(event);
}
}

@NgModule({
  declarations: [OrderListComponent],
  imports: [
    DxDataGridModule,
    FormTextboxModule,
    DxDropDownButtonModule,
    DxTextBoxModule,
    DxButtonModule,
    CommonModule,
    DxDateBoxModule,
    DxToolbarModule,
    DxAccordionModule,
    TextConColorModule,
    DxDropDownBoxModule,
    PlantaDropDownBoxModule,
  ],
  exports: [OrderListComponent],
  providers: [OrderService, PlantaService],
})
export class OrderListModule {}
