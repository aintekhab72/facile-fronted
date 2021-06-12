import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { HandleComponent } from './handle/handle.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'products', component: ProductsListComponent},
  { path: 'product-details', loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule) },
  { path: "handle/:id", component: HandleComponent},
  { path: 'my-orders', loadChildren: () => import('./my-orders/my-orders.module').then(m => m.MyOrdersModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollOffset: [0, 200], useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
