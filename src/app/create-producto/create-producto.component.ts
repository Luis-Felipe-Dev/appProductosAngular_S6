import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-create-producto',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './create-producto.component.html',
  styleUrl: './create-producto.component.css'
})
export class CreateProductoComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService, private router: Router){}

  ngOnInit(): void {
    
  }

  save(){
    console.log(this.product);
    this.productService.createProduct(this.product).subscribe(
      data => this.router.navigate(['/list']) //De forma asincrona al listado de productos.
    );
    console.log("continuando con la navegación...")
  }

}
