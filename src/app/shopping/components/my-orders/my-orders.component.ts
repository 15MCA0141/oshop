import { Order } from 'shared/models/order';
import { map, switchMap } from 'rxjs/operators';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$:any;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) { }


    ngOnInit(){
      this.orders$ = this.authService.user$
      .pipe(switchMap((user:any) => {
        return this.orderService.getOrdersByUser(user.uid);
      }));
    }

}
