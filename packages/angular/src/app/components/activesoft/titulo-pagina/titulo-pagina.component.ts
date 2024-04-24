import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-titulo-pagina',
  templateUrl: './titulo-pagina.component.html',
  styleUrls: ['./titulo-pagina.component.scss'],
})
export class TituloPaginaComponent {
  @Input() titulo: string = '';
  @Output() onClickVolver: EventEmitter<void> = new EventEmitter<void>();
  @Input() visibledButton: boolean = true;
  constructor(){}

  handleOnClick() {
    this.onClickVolver.emit();
  }
}

@NgModule({
  declarations: [TituloPaginaComponent],
  imports: [DxButtonModule],
  providers: [],
  exports: [TituloPaginaComponent],
})
export class TituloPaginaModule {}
