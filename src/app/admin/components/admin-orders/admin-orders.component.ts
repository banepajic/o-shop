import { Order } from 'src/app/shared/models/order';
import { OrderService } from '../../../shared/services/order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent {
  orders$;

  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.getOrders();
  }
}
