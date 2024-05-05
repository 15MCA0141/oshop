import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
  @Input('product') product: Product | any;
  @Input('shopping-cart') shoppingCart:any; 

  constructor(private cartService: ShoppingCartService) { }

  addToCart(){
    console.log(this.product.$key);
    console.log(this.product.key);
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }
}
