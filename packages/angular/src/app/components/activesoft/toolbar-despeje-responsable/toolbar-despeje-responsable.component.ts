import {
  Component,
  NgModule,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxDropDownButtonModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { SelectionChangedEvent } from 'devextreme/ui/data_grid';
import { ValueChangedEvent } from 'devextreme/ui/drop_down_box';
import { OperarioService } from 'src/app/services/operario.service';
import { Operario } from 'src/app/types/operario';

@Component({
  selector: 'app-toolbar-despeje-responsable',
  templateUrl: './toolbar-despeje-responsable.component.html',
  styleUrls: ['./toolbar-despeje-responsable.component.scss'],
})
export class ToolbarDespejeResponsableComponent implements OnInit {
  @Output() onSelectedItems: EventEmitter<Operario[]> = new EventEmitter<
    Operario[]
  >();
  @Output() onValueChangedRealizadoPor: EventEmitter<string | null> =
    new EventEmitter<string | null>();
  @Output() onValueChangedVerificadoPor: EventEmitter<string | null> =
    new EventEmitter<string | null>();

  operarios: Operario[];
  operVerificado: Operario;
  operRealizado: Operario;
  gridBoxValueRecurso = [];
  gridBoxValue = [];
  gridColumns: string[] = ['id', 'name'];

  constructor(private operariosService: OperarioService) {}

  ngOnInit(): void {
    this.operariosService.getOperarios().subscribe((value) => {
      this.operarios = value;
    });
  }

  displayExpr = ({ id, name }) => `<${id}-${name}>`;

  handleAddRegisterBtn() {}
  handleCancelRegister() {}
  handleSelectionRealizadoPor(event: SelectionChangedEvent) {
    const { selectedRowsData } = event;
    this.operRealizado = selectedRowsData[0];
    if (this.operVerificado && this.operRealizado) {
      this.onSelectedItems.emit([this.operRealizado, this.operVerificado]);
    }
  }
  handleSelectionVerificadoPor(event: SelectionChangedEvent) {
    const { selectedRowsData } = event;
    this.operVerificado = selectedRowsData[0];
    if (this.operVerificado && this.operRealizado) {
      this.onSelectedItems.emit([this.operRealizado, this.operVerificado]);
    }
  }

  handleValueChangedRealizado(valueChange: ValueChangedEvent) {
    const { value } = valueChange;
    if(value){
      this.onValueChangedRealizadoPor.emit(value.at(0));
    }else {
      this.onValueChangedRealizadoPor.emit(value);
    }
  }
  handleValueChangedVerificado(valueChange: ValueChangedEvent) {
    const { value } = valueChange;
    if(value){
      this.onValueChangedVerificadoPor.emit(value.at(0));
    }else {
      this.onValueChangedVerificadoPor.emit(value);
    }
  }
}

@NgModule({
  declarations: [ToolbarDespejeResponsableComponent],
  imports: [
    DxToolbarModule,
    DxDropDownButtonModule,
    DxDateBoxModule,
    DxDropDownBoxModule,
    DxDataGridModule,
    DxButtonModule,
  ],
  providers: [OperarioService],
  exports: [ToolbarDespejeResponsableComponent],
})
export class ToolbarDespejeResponsableModule {}
