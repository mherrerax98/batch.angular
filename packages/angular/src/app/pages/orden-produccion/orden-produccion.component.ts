import { Component, NgModule } from '@angular/core';
import { OrderService } from 'src/app/services/order-service';

@Component({
  selector: 'app-orden-produccion',
  templateUrl: './orden-produccion.component.html',
  styleUrls: ['./orden-produccion.component.scss']
})
export class OrdenProduccionComponent {

}

@NgModule({
  declarations: [OrdenProduccionComponent],
  imports: [],
  providers: [OrderService],
  exports: [OrdenProduccionComponent]
})
export class OrdenProduccionModule {}
