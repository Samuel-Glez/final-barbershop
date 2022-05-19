import { Component, OnInit } from '@angular/core';
import { ServicioService } from './../../services/servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

interface Servicio{
  idservicio: number;
  precio: number;
  servicio: string;
  tiempo: number;
}

@Component({
  selector: 'app-editservicio',
  templateUrl: './editservicio.page.html',
  styleUrls: ['./editservicio.page.scss'],
})
export class EditservicioPage implements OnInit {

  idservicio: number;
  precio: number;
  servicio: string;
  tiempo: number;

  allServicio: Servicio = {
    idservicio: null,
    precio: null,
    servicio: '',
    tiempo: null
  };

  borrar = false;
  editar = false;


  constructor(private activatedRouted: ActivatedRoute, private router: Router, private servicioService: ServicioService) { }

  ngOnInit() {
    this.activatedRouted.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.servicioService.getServicioId(id)
        .subscribe((datos: Servicio) => {
          this.allServicio = datos;
          console.log(this.allServicio);
        });
    });
  }

  borrarServicio() { this.borrar = true; }
  editarServicio() { this.editar = true; }

  editarForm(formulario: NgForm) {

    console.log(formulario);

    if (this.borrar === true) {
      console.log(this.allServicio.idservicio);
      this.servicioService
        .deleteServicioId(this.allServicio.idservicio)
        .subscribe(x => console.log('x', x));
    }

    if (this.editar === true) {
      console.log(this.allServicio);
      this.servicioService
        .putservicio(this.allServicio)
        .subscribe(x => console.log('x', x));
    }


    this.router.navigate(['servicio'])
    .then(() => {
      window.location.reload();
    });
  }

}
