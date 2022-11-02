import { Component, OnInit } from '@angular/core';
import { of, Subject, Observable, combineLatest } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  pageTitle = 'Products';

  products$ = this.productService.products$;
  selectedProduct$ = this.productService.selectedProduct$;

  vm$ = combineLatest(([this.products$, this.selectedProduct$])).pipe(
    map(([products, product]: [IProduct[], any]) => ({
      products,
      productId: product ? product.id : 0
    }))
  )

  ngOnInit(): void {
    this.route.firstChild?.paramMap.subscribe(params => {
      const id = params.get('id');
      this.productService.changeSelectedProduct(Number(id));
    });
  }

  onSelected(productId: number): void {
    // Modify the URL to support deep linking
    this.router.navigate(['/products', productId]);
  }

}
