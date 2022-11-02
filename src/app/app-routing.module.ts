import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { AppModule } from './app.module';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: ':id',
        component: ProductDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
