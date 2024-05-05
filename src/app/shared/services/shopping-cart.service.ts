import { ShoppingCart } from 'shared/models/shopping-cart';
import { Product } from 'shared/models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  // selectedItem: any ;

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(map((x:any) => {
        if (!x) { return new ShoppingCart(); }
        return new ShoppingCart(x.items);
      }));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) { 
     return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string>  {
    let cartId:any  = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let result: any = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    
    let cartId = await this.getOrCreateCartId();
    
    let item$: any = this.getItem(cartId, product.$key);
    
      item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      let quantity = change;
      if (item.payload.exists()){
        quantity = item.payload.val().quantity + change;
      }
      if (quantity === 0) item$.remove();
      else item$.update({
          // productId: product.$key,
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
    });
  }
}
