import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './main/login/login.component';
import { ProductItemComponent } from './main/home/product-item/product-item.component';
import { ProfileComponent } from './main/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductDetailComponent } from './main/home/product-detail/product-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductItemComponent, canActivate: [AuthGuard] },
  { path: 'product-detail/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
