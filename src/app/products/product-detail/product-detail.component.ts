import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { combineLatest, of, Subject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  selectedProduct$ = this.productService.selectedProduct$;
  pageTitle$ = this.selectedProduct$.pipe(
      map(p => p ? `Product Detail for: ${p.productName}` : null)
    );

  vm$ = combineLatest([this.selectedProduct$, this.pageTitle$]).pipe(
    filter(([product]) => !!product),
    map(([product, pageTitle]) => ({
      product,
      pageTitle
    }))
  );

  ngOnInit(): void {
  }

}
