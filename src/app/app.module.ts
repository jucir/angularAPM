import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppData } from './app-data';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(AppData, { delay: 1000 }),
    
  ],
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
