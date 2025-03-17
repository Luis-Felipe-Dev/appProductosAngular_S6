import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateProductoComponent } from './create-producto/create-producto.component';
import { HomeProductComponent } from './home-product/home-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductListMaterialComponent } from './product-list-material/product-list-material.component';

export const routes: Routes = [
    {path: "list", component: ProductListComponent},
    {path: "material", component: ProductListMaterialComponent},
    {path: "create", component: CreateProductoComponent},
    {path: "home", component: HomeProductComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];
