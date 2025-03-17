import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../model/product';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-list-material',
  imports: [MatTableModule, MatPaginatorModule, MatInputModule], //Se debe agregar el Import para que la vista html reconozca los controles
  templateUrl: './product-list-material.component.html',
  styleUrl: './product-list-material.component.css'
})
export class ProductListMaterialComponent implements OnInit, AfterViewInit {

  products : Product[]
  displayedColumns = ["codigo","descripcion","precio","stock","total"];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator, {static:true}) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;


  constructor(private productService: ProductService){
      productService.getProductList().subscribe(products => this.dataSource.data = products);
      console.log("Load product Material...")
  }

  ngOnInit(): void{
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
    this.paginator._intl.nextPageLabel = 'Siguiente página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.firstPageLabel = 'Primera página';
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  //Método para filtrar información en la grilla
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
