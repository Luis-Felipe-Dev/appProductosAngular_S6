import { Component, OnInit } from '@angular/core';
import { Product, ProductType } from '../model/product';
import { ProductService } from '../service/product.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  tipoBusqueda: ProductType | null = null; // Property to hold the selected filter type
  stockBusqueda: number | null = null;
  tipos = Object.values(ProductType); 

  constructor(private productService: ProductService){}; //Inyectando el servicio

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(){
    console.log("Reload!!!");
    this.productService.getProductList().subscribe(products => this.products = products);
  }

  // a) Agregar a la clase producto el campo “tipo” que puede tener los siguientes valores “Gaseosas, Lácteos y Conservas”,
  // luego en la opción de listado de productos implementar la búsqueda por tipo de producto. (4 puntos)
  buscarPorTipo(tipo: ProductType | null): void {
    if (tipo) { // validación explícita para evitar 'null'
      console.log(tipo)
      this.productService.findByTipo(tipo).subscribe({
        next: (productos) => {
          this.products = productos as Product[];
          console.log('Productos filtrados por tipo:', this.products);
        },
        error: (error) => {
          console.error('Error al buscar productos:', error);
        }
      });
    } else {
      this.reloadData();
    }
  }

  // b) En la opción de listado de productos implementar la búsqueda de productos cuyo stock sea
  // mayor o igual a un stock determinado. (2 puntos).
  buscarPorStock(): void {
    if (this.stockBusqueda !== null && this.stockBusqueda >= 0) {
      this.productService.getFindByStockGreaterThanEqual(this.stockBusqueda).subscribe({
        next: (productos) => {
          this.products = productos as Product[];
          console.log('Productos filtrados por stock:', this.products);
        },
        error: (error) => {
          console.error('Error al buscar productos:', error);
        }
      });
    } else {
      this.reloadData();
    }
  }

  // c)	En la opción de listado de productos implementar la opción de eliminación de un producto. (2 puntos).
  eliminarProducto(id: number) {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      this.productService.deleteProducto(id).subscribe({
        next: res => {
          console.log('Producto eliminado:', res);
          this.reloadData();
        },
        error: err => {
          console.error('Error al eliminar producto:', err);
        }
      });
    }
  }
}
