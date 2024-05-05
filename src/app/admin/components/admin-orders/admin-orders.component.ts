import { Order } from 'shared/models/order';
import { Observable } from 'rxjs';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit{
orders$: any;
  
constructor(private orderService: OrderService) { 
}

ngOnInit() {
  this.orders$ = this.orderService.getOrders();
}


}
