import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart> | any;

  constructor(
    private shoppingCartService: ShoppingCartService) {}
  
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    // let cart$ = await this.shoppingCartService.getCart();
    // cart$.subscribe((cart:any) => this.cart$ = cart);
  }
}

