import {
  Component,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import {
  DxButtonGroupModule,
  DxButtonModule,
  DxDataGridModule,
  DxDropDownBoxModule,
} from 'devextreme-angular';
import { SelectionChangedEvent } from 'devextreme/ui/data_grid';
import { ValueChangedEvent } from 'devextreme/ui/drop_down_box';
import { OrderService } from 'src/app/services/order-service';
import { Orders } from 'src/app/types/orders';

@Component({
  selector: 'app-comord-drop-down-box',
  templateUrl: './comord-drop-down-box.component.html',
  styleUrls: ['./comord-drop-down-box.component.scss'],
})
export class ComordDropDownBoxComponent implements OnChanges {
  @Input() fechaInicial: Date | null;
  @Input() fechaFinal: Date | null;
  @Input() planta: string | null;
  @Input() placeholder: string = 'Selecione una Orden';
  @Input() disbled: boolean;
  @Output() onSelectionChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() onValueChanged: EventEmitter<any | null> = new EventEmitter<any | null>();

  orders: Orders[] = [];
  gridBoxValue = [];
  displayExpr = ({ idCompro, numero }) =>
    `Compro: ${idCompro} - Ord: ${numero}`;
  gridColumns = ['idCompro', 'numero'];

  constructor(private orderService: OrderService) {}

  handleOnSelectionChanged(event: SelectionChangedEvent) {
    const { selectedRowsData } = event;
    if (selectedRowsData.length > 0) {
      const { idCompro, numero } = selectedRowsData?.at(0);
      this.onSelectionChanged.emit({ idCompro, numero });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { fechaInicial, fechaFinal, planta } = changes;
    if (fechaInicial && fechaFinal && planta) {
      const fecInit = fechaInicial.currentValue;
      const fecFinal = fechaFinal.currentValue;
      const p = planta.currentValue;
      if (fecInit && fecFinal && p) {
        this.orderService.get(fecInit, fecFinal, p).subscribe((orders) => {
          this.orders = orders;
        });
      } else {
        this.orders = [];
      }
    }
  }

  handleOnValueChanged(valueChange: ValueChangedEvent) {
    this.onValueChanged.emit(valueChange.value);
  }
}

@NgModule({
  declarations: [ComordDropDownBoxComponent],
  imports: [DxDropDownBoxModule, DxDataGridModule, DxButtonModule],
  providers: [OrderService],
  exports: [ComordDropDownBoxComponent],
})
export class ComordDropDownBoxModule {}
