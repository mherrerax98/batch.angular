import { Component, Input, NgModule, Output, EventEmitter } from '@angular/core';
import { DxButtonModule, DxPopupModule } from 'devextreme-angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() visible: boolean = false;
  @Input() text: string = '';
  @Output() onClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleAceptarBtn() {
    this.onClick.emit(true);
  }

  handleCancelarBtn() {
    this.onClick.emit(false);
  }
}

@NgModule({
  declarations: [AlertComponent],
  imports: [DxPopupModule, DxButtonModule],
  providers: [],
  exports: [AlertComponent]
})
export class AlertModule {}
