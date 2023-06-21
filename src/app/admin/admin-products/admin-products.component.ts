import { Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe((products: Product[]) => {
        this.products = products;
        this.filteredProducts = products;
      });
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter((p: Product) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}
}
