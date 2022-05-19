import { ServicioService } from './../../services/servicio.service';
import { Component, OnInit } from '@angular/core';

interface Servicio {
  idservicio: number;
  precio: number;
  servicio: string;
  tiempo: number;
}

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
})
export class ServicioPage implements OnInit {


  constructor(private servicioService: ServicioService) { }

  ngOnInit() {
    this.servicioService
      .getservicio()
      .subscribe((datos: any) => {
        console.log(datos);
        this.allServicio = datos;
      });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  allServicio: Servicio[];

}
