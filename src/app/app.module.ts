import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './main/home/home.component';
import { ProductItemComponent } from './main/home/product-item/product-item.component';
import { PaganationComponent } from './shared/paganation/paganation.component';
import { SearchComponent } from './shared/search/search.component';
import { ProductDetailComponent } from './main/home/product-detail/product-detail.component';
import { LoginComponent } from './main/account/login/login.component';
import { ProfileComponent } from './main/account/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ProductItemComponent,
    ProfileComponent,
    PaganationComponent,
    SearchComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
