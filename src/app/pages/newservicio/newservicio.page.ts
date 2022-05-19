import { NgForm } from '@angular/forms';
import { ServicioService } from './../../services/servicio.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Servicio {
  idservicio: number;
  precio: number;
  servicio: string;
  tiempo: number;
}

@Component({
  selector: 'app-newservicio',
  templateUrl: './newservicio.page.html',
  styleUrls: ['./newservicio.page.scss'],
})
export class NewservicioPage implements OnInit {

  idservicio: number;
  precio: number;
  servicio: string;
  tiempo: number;
  datos: Servicio;

  constructor(private router: Router, private servicioService: ServicioService) { }

  ngOnInit() {
  }



  agregarServicio(formulario: NgForm) {
    let controls = formulario.form.controls;
    this.precio = controls.inputprecio.value;
    this.servicio = controls.inputservicio.value;
    this.tiempo = controls.inputtiempo.value;

    console.log(controls.inputprecio.value);
    console.log(controls.inputservicio.value);
    console.log(controls.inputtiempo.value);

    this.datos = {
      idservicio: null,
      precio: this.precio,
      servicio: this.servicio,
      tiempo: this.tiempo
    };

    if (this.precio > 0 && this.servicio.length > 0 && this.tiempo > 0) {
      this.servicioService
        .postServicio(this.datos)
        .subscribe(x => console.log('x', x));

      this.router.navigate(['inicioadmin'])
        .then(() => {
          window.location.reload();
        });
    }

  }

}
