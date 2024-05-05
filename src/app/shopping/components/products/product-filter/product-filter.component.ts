import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$:any;
  @Input('category') category: any;

  constructor(categoryService: CategoryService) { 
    this.categories$ = categoryService.getAll().snapshotChanges();
  }

  ngOnInit(): void {
  }

}
