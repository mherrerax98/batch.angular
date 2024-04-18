import {
  Component,
  NgModule,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxDropDownBoxModule,
} from 'devextreme-angular';
import { SelectionChangedEvent } from 'devextreme/ui/data_grid';
import {
  ChangeEvent,
  ClosedEvent,
  OptionChangedEvent,
  ValueChangedEvent,
} from 'devextreme/ui/drop_down_box';
import { PlantaService } from 'src/app/services/planta.service';
import { Planta } from 'src/app/types/planta';

@Component({
  selector: 'app-planta-drop-down-box',
  templateUrl: './planta-drop-down-box.component.html',
  styleUrls: ['./planta-drop-down-box.component.scss'],
})
export class PlantaDropDownBoxComponent implements OnInit {
  @Output()
  onSelectionChanged: EventEmitter<string | null> =
    new EventEmitter<string | null>();

  @Input() 
  placeholder: any = 'Seleccione una planta';
  @Input() disabled: boolean;
  
  plantas: Planta[] = [];
  gridBoxValue = [];
  displayExpr = ({ id, nombre }) => `<${id}-${nombre}>`;
  gridColumns = ['id', 'nombre'];
  value: any;

  constructor(private plantaService: PlantaService) {}
 

  ngOnInit(): void {
    this.plantaService.getPlantas().subscribe((plantas) => {
      this.plantas = plantas;
    });
  }

  handleOnSelectionChanged(event: SelectionChangedEvent) {
    const { selectedRowKeys } = event;
    this.onSelectionChanged.emit(selectedRowKeys?.at(0));
  }

  handleOnValueChanged(event: ValueChangedEvent) {
    const { value } = event;
      this.onSelectionChanged.emit(value);
  }
}

@NgModule({
  declarations: [PlantaDropDownBoxComponent],
  imports: [DxDropDownBoxModule, DxDataGridModule],
  providers: [PlantaService],
  exports: [PlantaDropDownBoxComponent],
})
export class PlantaDropDownBoxModule {}
