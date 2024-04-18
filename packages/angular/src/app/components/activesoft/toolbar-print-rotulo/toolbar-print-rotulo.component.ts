import { Component, NgModule } from '@angular/core';
import { DxDropDownButtonModule, DxToolbarModule } from 'devextreme-angular';

@Component({
  selector: 'app-toolbar-print-rotulo',
  templateUrl: './toolbar-print-rotulo.component.html',
  styleUrls: ['./toolbar-print-rotulo.component.scss']
})
export class ToolbarPrintRotuloComponent {
  operario = ['Pedro', 'Juan', 'Luis'];
  auditor = ['Carlos', 'Mario']
}

@NgModule({
  declarations: [ToolbarPrintRotuloComponent],
  imports: [DxToolbarModule, DxDropDownButtonModule],
  providers: [],
  exports: [ToolbarPrintRotuloComponent]
})
export class ToolbarPrintRotuloModule {}
