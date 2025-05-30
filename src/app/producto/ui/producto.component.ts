import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { ProductoService } from '../data-access/producto.service';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../carrito/data-access/carrito.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-producto',
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
})

export class ProductoComponent implements OnInit {
  public productos: Producto[] = [];
  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router:Router
  ) { }
  async ngOnInit() {
    this.productos = await lastValueFrom(this.productoService.obtenerProductos()).then((prods) => prods);
  }

  agregarAlCarrito(producto: Producto) {
  console.log('Cantidad disponible: ', producto.cantidad);
  if (producto.cantidad > 0) {
    this.carritoService.agregarProducto(producto, 1);
  } else {
    alert('No puedes agregar más de la cantidad disponible en inventario.');
  }
  }

  irAlCarrito() {
    this.router.navigate(['/carrito']);
  }

  irAlInventario() {
    this.router.navigate(['/inventario']);
  }
}