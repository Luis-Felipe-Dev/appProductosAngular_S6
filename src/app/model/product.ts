
export enum ProductType {
    GASEOSAS = 'GASEOSAS',
    LACTEOS = 'LACTEOS',
    CONSERVAS = 'CONSERVAS'
  }
  
export class Product {
    codigo: number;
    descripcion: string;
    precio: number;
    stock: number;
    // a) Agregar a la clase producto el campo “tipo” que puede tener los siguientes valores “Gaseosas, Lácteos y Conservas”,
    // luego en la opción de listado de productos implementar la búsqueda por tipo de producto. (4 puntos)
    tipo: ProductType;
    venta: number;
}