import { Component, NgModule } from '@angular/core';
import { DxDropDownButtonModule, DxTextBoxModule, DxToolbarModule } from 'devextreme-angular';

@Component({
  selector: 'app-toolbar-controles-en-proceso',
  templateUrl: './toolbar-controles-en-proceso.component.html',
  styleUrls: ['./toolbar-controles-en-proceso.component.scss']
})
export class ToolbarControlesEnProcesoComponent {
  medicion = ['Peso', 'Volumen'];
  producto = 'DL00000007';
}


@NgModule({
  declarations: [ToolbarControlesEnProcesoComponent],
  imports: [DxToolbarModule,DxDropDownButtonModule, DxTextBoxModule],
  providers: [],
  exports: [ToolbarControlesEnProcesoComponent]
})
export class ToolbarControlesEnProcesoModule {}