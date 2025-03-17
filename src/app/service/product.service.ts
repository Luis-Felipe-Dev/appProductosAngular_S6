import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs'; //Reactive Extensions for JavaScript
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL_SERVICES = 'http://localhost:8080'; //Verificar el puerto en la API Rest
  private urlBase = this.URL_SERVICES + '/api';

  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'}); //Definir manualmente

  //Inyectando http
  constructor(private http:HttpClient) { }

  //Listamos todos los productos con su precio final de venta calculado
  getProductList(): Observable<any>{
    console.log("Llamando a REST: " + this.urlBase + "/productosVenta");// Esta línea escribe en el log
    return this.http.get(this.urlBase + '/productosVenta').pipe(
      map(response => response as Product[])
    )
  }

  //Método para registrar un producto
  createProduct(product:Object): Observable<Object>{
    return this.http.post(this.urlBase + "/producto", product, {headers:this.httpHeaders})
  }

  // b) En la opción de listado de productos implementar la búsqueda de productos cuyo stock sea
  // mayor o igual a un stock determinado. (2 puntos).
  getFindByStockGreaterThanEqual(stock: number): Observable<Object>{
    return this.http.get(this.urlBase + `/productosStockMayorOIgualA/${stock}`);
  }

  // c)	En la opción de listado de productos implementar la opción de eliminación de un producto. (2 puntos).
  deleteProducto(id: number): Observable<any> {
    return this.http.delete(this.urlBase + `/producto/${id}`);
  }
}
