import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppData } from './app-data';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductsComponent } from './products/products.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(AppData, { delay: 1000 }),
  ],
  declarations: [
    AppComponent,
    ProductsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
