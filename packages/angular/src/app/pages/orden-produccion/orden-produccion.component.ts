import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridModule, DxTextBoxModule } from 'devextreme-angular';
import { TituloPaginaModule } from 'src/app/components/activesoft/titulo-pagina/titulo-pagina.component';
import { OrderService } from 'src/app/services/order-service';

@Component({
  selector: 'app-orden-produccion',
  templateUrl: './orden-produccion.component.html',
  styleUrls: ['./orden-produccion.component.scss'],
})
export class OrdenProduccionComponent {
  constructor(private router: Router) {}

  handleVolverBoton() {
    this.router.navigate(['cover-page']);
  }
}

@NgModule({
  declarations: [OrdenProduccionComponent],
  imports: [DxTextBoxModule, DxDataGridModule, TituloPaginaModule],
  providers: [OrderService],
  exports: [OrdenProduccionComponent],
})
export class OrdenProduccionModule {}
