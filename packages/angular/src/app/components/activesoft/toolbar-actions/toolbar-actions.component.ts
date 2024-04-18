import { Component, NgModule } from '@angular/core';
import { DxButtonModule, DxToolbarModule } from 'devextreme-angular';

@Component({
  selector: 'app-toolbar-actions',
  templateUrl: './toolbar-actions.component.html',
  styleUrls: ['./toolbar-actions.component.scss']
})
export class ToolbarActionsComponent {

}

@NgModule({
  declarations: [ToolbarActionsComponent],
  imports: [DxToolbarModule, DxButtonModule],
  providers: [],
  exports: [ToolbarActionsComponent]
})
export class ToolbarActionsModule {}
