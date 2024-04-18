import {
  Component,
  Input,
  NgModule,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { OperacionService } from 'src/app/services/operacion.service';
import { PlantaService } from 'src/app/services/planta.service';
import { Operacion } from 'src/app/types/operacion';
import { Planta } from 'src/app/types/planta';
import { PlantaDropDownBoxModule } from '../planta-drop-down-box/planta-drop-down-box.component';
import { ComordDropDownBoxModule } from '../comord-drop-down-box/comord-drop-down-box.component';
import { CommonModule } from '@angular/common';
import { SelectionChangedEvent } from 'devextreme/ui/drop_down_button';

@Component({
  selector: 'app-order-info-area',
  templateUrl: './order-info-area.component.html',
  styleUrls: ['./order-info-area.component.scss'],
})
export class OrderInfoAreaComponent implements OnInit, OnChanges {
  @Input() editable: boolean = false;
  @Input() compro?: string;
  @Input() numOrd?: number;
  @Input() idPlanta?: string;
  @Input() enableOperacion?: boolean = true;
  @Input() operacion: string | null;

  @Output() onSelectionChanged: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() onSelectionChangedComOrd: EventEmitter<{
    idCompro: string;
    numero: number;
  }> = new EventEmitter<{ idCompro: string; numero: number }>();

  @Output() onValueChangedComOrd: EventEmitter<any | null> = new EventEmitter<
    any | null
  >();

  @Output() onSelectionChangedOperacion: EventEmitter<Operacion> = new EventEmitter<Operacion>();

  operaciones: Operacion[] = [];
  plantas: Planta[];
  fechaInicial: Date | null;
  fechaFinal: Date | null;
  planta: string | null;
  placeholderPlanta: string;
  placeholderComOrd: string;
  displayExprOperacion: string | Function = ({ idOperacion, nombre }) =>
    idOperacion && `${idOperacion} - ${nombre}`;

  constructor(
    private plantaService: PlantaService,
    private operacionService: OperacionService
  ) {
    this.editable = false;
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { compro, idPlanta, numOrd } = changes;
    if (compro && idPlanta && numOrd) {
      if (compro.currentValue && idPlanta.currentValue && numOrd.currentValue) {
        this.operacionService
          .getOperacionRuta(
            compro.currentValue,
            idPlanta.currentValue,
            numOrd.currentValue
          )
          .subscribe((operaciones) => {
            this.operaciones = operaciones;
          });
      }
    }
  }

  ngOnInit(): void {
    if (this.editable) {
      this.plantaService.getPlantas().subscribe((plantas) => {
        this.plantas = plantas;
      });
    } else {
      this.placeholderPlanta = this.idPlanta;
      this.placeholderComOrd = `Compro: ${this.compro} - Ord: ${this.numOrd}`;
    }

    // this.operacionesService.getOperacion().subscribe(operaciones=>{
    //   this.operaciones = operaciones;
    // });
  }

  handleOnSelectionChanged(planta: string | null) {
    if (planta) {
      this.fechaInicial = new Date(2024, 0, 1);
      this.fechaFinal = new Date();
      this.planta = planta;
      this.onSelectionChanged.emit(planta);
    } else {
      this.fechaInicial = null;
      this.fechaFinal = null;
      this.planta = null;
    }
  }

  handleOnSelectionChangedComOrd(event: any) {
    this.onSelectionChangedComOrd.emit(event);
    if (event) {
      const { idCompro, numero } = event;
      if (idCompro && numero) {
        this.operacionService
          .getOperacionRuta(idCompro, this.planta, numero)
          .subscribe((operaciones) => {
            this.operaciones = operaciones;
          });
      }
    }
  }

  handleOnValueChangedComOrd(valueChanged: any) {
    if(!valueChanged) this.operaciones = [];
    this.onValueChangedComOrd.emit(valueChanged);
  }

  handleOnSelectionChangedOperacion(selectionChangedEvent: SelectionChangedEvent) {
    const { item } = selectionChangedEvent
    this.onSelectionChangedOperacion.emit(item);
  }
}

@NgModule({
  declarations: [OrderInfoAreaComponent],
  imports: [
    DxToolbarModule,
    DxDropDownButtonModule,
    DxTextBoxModule,
    PlantaDropDownBoxModule,
    ComordDropDownBoxModule,
    CommonModule,
  ],
  providers: [PlantaService, OperacionService],
  exports: [OrderInfoAreaComponent],
})
export class OrderInfoAreaModule {}
