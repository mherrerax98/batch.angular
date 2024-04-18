import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular';
import { CertificadoCalidadModule } from 'src/app/components/activesoft/certificado-calidad/certificado-calidad.component';

@Component({
  selector: 'app-certificado-calidad-page',
  templateUrl: './certificado-calidad-page.component.html',
  styleUrls: ['./certificado-calidad-page.component.scss']
})
export class CertificadoCalidadPageComponent implements OnInit {

  editable: boolean;
  numOrd: any;
  idCompro: any;
  idPlanta: any;


  constructor(private router: Router, private route: ActivatedRoute){
    this.editable = true;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const editable = params['editable'];
      const numOrd = params['numord'];
      const idCompro = params['compro'];
      const planta = params['planta'];
      const operacion = params['operacion'];
      const enableOp = params['op'];
      if (editable == 'n') {
        this.editable = false;
        this.numOrd = numOrd;
        this.idCompro = idCompro;
        this.idPlanta = planta;
      }
    })
  }
  
  handleAceptarButton(): void {
    this.router.navigate(['batch-record-etapas-list'])
  }

}

@NgModule({
  declarations: [CertificadoCalidadPageComponent],
  imports: [CertificadoCalidadModule, DxButtonModule],
  providers: [],
  exports: [CertificadoCalidadPageComponent]
})
export class CertificadoCalidadPageModule {}
