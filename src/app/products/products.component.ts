import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[];

  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products.map((product) => ({
            $key: product.$key,
            title: product['title'],
            price: product['price'],
            category: product['category'],
            imageUrl: product['imageUrl'],
          }));
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });
  }
}
