import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  user:any;

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order: any) {
    let result = await  this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders').snapshotChanges()
    .pipe(map(data => {
      return data.map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() as object };
        return data;
      });
    }));
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
    .snapshotChanges().pipe(map(data => {
      return data.map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() as object };
        return data;
      });
    }));
  }
}
