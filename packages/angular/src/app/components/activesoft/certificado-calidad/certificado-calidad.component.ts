import { Component, Input, NgModule, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { OrderInfoAreaModule } from '../order-info-area/order-info-area.component';
import { CriterioCalidad } from 'src/app/types/criterio.calidad';
import { CriterioCalidadService } from 'src/app/services/criterio.calidad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificado-calidad',
  templateUrl: './certificado-calidad.component.html',
  styleUrls: ['./certificado-calidad.component.scss']
})
export class CertificadoCalidadComponent implements OnInit {
  @Input() numOrd: any;
  @Input() idCompro: any;
  @Input() idPlanta: any;
  @Input() editable: boolean = true;
  cumple = ['Aprobado', 'Pendiente'];

  certificadoCalidadDataSource: Array<CriterioCalidad> = [];

  calculateDisplayValue = ({ aprobo }) => {
      switch(aprobo){
        case 'B': return 'Aprobado';
        case 'P': return 'Pendiente';
        default: return aprobo;
      }
  };



  constructor(private criterioCalidadService: CriterioCalidadService){}

  ngOnInit(): void {
    this.criterioCalidadService.getCriterio('6300', 56393).subscribe(criterios => {
      this.certificadoCalidadDataSource = criterios;
    });
  }
}


@NgModule({
  declarations: [CertificadoCalidadComponent],
  imports: [DxDataGridModule, OrderInfoAreaModule, CommonModule],
  providers: [CriterioCalidadService],
  exports: [CertificadoCalidadComponent]
})
export class CertificadoCalidadModule {}