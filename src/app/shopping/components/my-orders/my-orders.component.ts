import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators'; // Import the switchMap operator
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
    this.orders$ = this.authService.user$.pipe(
      switchMap((u) => this.orderService.getOrdersByUser(u.uid))
    ); // Use the pipe() method with switchMap()
  }
}
