import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { DxFileUploaderModule } from 'devextreme-angular';
import {
  FilesUploadedEvent,
  UploadedEvent,
  ValueChangedEvent,
} from 'devextreme/ui/file_uploader';
import { OrderInfoAreaModule } from 'src/app/components/activesoft/order-info-area/order-info-area.component';

@Component({
  selector: 'app-instructivo-fabricacion',
  templateUrl: './instructivo-fabricacion.component.html',
  styleUrls: ['./instructivo-fabricacion.component.scss'],
})
export class InstructivoFabricacionComponent {
  value: File[] = [];
  pdfFile: ArrayBuffer;
  constructor() {}

  async handleOnValueChanged(event: ValueChangedEvent) {
  
  }
}

@NgModule({
  declarations: [InstructivoFabricacionComponent],
  imports: [DxFileUploaderModule, CommonModule, OrderInfoAreaModule],
  providers: [],
  exports: [InstructivoFabricacionComponent],
})
export class InstructivoFabricacionModule {}
