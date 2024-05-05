import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
products: Product[] | any;
dtOptions: DataTables.Settings = {};
subscription: Subscription | any ;

dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.subscription = this.productService.getAll().snapshotChanges()
      .subscribe(products => { 
        this.products = products
        this.dtTrigger.next();

        this.subscription.unsubscribe();
      });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}

