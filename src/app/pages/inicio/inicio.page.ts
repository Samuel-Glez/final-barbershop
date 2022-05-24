import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReservaService } from './../../services/reserva.service';
import { Component, OnInit } from '@angular/core';

interface Servicio {
  idservicio: number;
  precio: number;
  servicio: string;
  tiempo: number;
}

interface Reserva {
  idreserva: number;
  fecha: string;
  hora: string;
  horacancelada: string;
  ordenhora: number;
  duracion: number;
  fkidservicio: number;
  fkidusuario: number;
  fkidpeluquero: number;
  status: string;
}

interface Usuario {
  idusuario: number;
  nombre: string;
  apellidos: string;
  telefono: number;
  email: string;
  password: string;
}





@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {
  year: string;
  month: string;
  day: string;
  fechaDB: number;
  idservicio: number;
  idpeluquero: number;
  nombrePeluquero: string;
  horaFront: string[];
  horacanceladaFront: string;
  link: string[];
  ruta: string;
  datos: Reserva;
  reserva: Reserva;
  iduser: number;



  constructor(private reservaService: ReservaService, private router: Router, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    localStorage.removeItem('update');
    this.reservaService
      .getReserva()
      .subscribe((datos: Reserva[]) => {
        this.allReserva = datos.filter(r => r.fkidusuario === Number(localStorage.getItem('idusuario'))).reverse();
        this.ultimaReserva = this.allReserva[0];
        this.separarfecha(this.ultimaReserva.fecha);
        this.fechaDB = Date.parse(this.ultimaReserva.fecha + ' ' + this.ultimaReserva.hora.split(',', 1));
        this.horaFront = this.ultimaReserva.hora.split(',', 1);
        if(this.ultimaReserva.horacancelada !== null){
          this.horacanceladaFront = this.ultimaReserva.horacancelada;
        }
        this.idservicio = this.ultimaReserva.fkidservicio;
        this.idpeluquero = this.ultimaReserva.fkidpeluquero;
        this.ruta = 'reserva/' + this.idservicio.toString();
        this.link = [this.ruta];
        this.cancelar();
        console.log(this.link);
        console.log(this.idpeluquero);
        console.log(this.idservicio);
        console.log(this.ultimaReserva.hora.split(',', 1));
      });

    this.reservaService
      .getUsuario()
      .subscribe((datos: Usuario[]) => {
        this.allUser = datos.filter(u => u.idusuario === this.idpeluquero);
        console.log(this.allUser);
        this.nombrePeluquero = this.allUser[0].nombre + ' ' + this.allUser[0].apellidos;
        console.log(this.allUser);
      });

    this.reservaService
      .getservicio()
      .subscribe((datos: any) => {
        console.log(datos);
        this.allService = datos;
      });

    this.reservaService.getReservaId(Number(localStorage.getItem('idreserva')))
      .subscribe((datos: Reserva) => {
        datos.horacancelada = this.ultimaReserva.hora.split(',', 1).toString();
        datos.hora = '';
        datos.status = 'Cancelada';
        this.reserva = datos;
      });
  }


  separarfecha(fecha: string) {
    const separate = fecha.split('-');
    this.year = separate[0];
    this.month = separate[1];
    this.day = separate[2];
    console.log(this.month);
    console.log(this.day);

    switch (Number(this.month)) {
      case 1:
        this.month = 'Enero';
        console.log(this.month);
        break;
      case 2:
        this.month = 'Febrero';
        console.log(this.month);
        break;
      case 3:
        this.month = 'Marzo';
        console.log(this.month);
        break;
      case 4:
        this.month = 'Abril';
        console.log(this.month);
        break;
      case 5:
        this.month = 'Mayo';
        console.log(this.month);
        break;
      case 6:
        this.month = 'Junio';
        console.log(this.month);
        break;
      case 7:
        this.month = 'Julio';
        console.log(this.month);
        break;
      case 8:
        this.month = 'Agosto';
        console.log(this.month);
        break;
      case 9:
        this.month = 'Septiembre';
        console.log(this.month);
        break;
      case 10:
        this.month = 'Octubre';
        console.log(this.month);
        break;
      case 11:
        this.month = 'Noviembre';
        console.log(this.month);
        break;
      case 12:
        this.month = 'Diciembre';
        console.log(this.month);
        break;

      default:
        console.log('No such month exists!');
        break;
    }
  }


  fechaActual() {
    const date = new Date();
    const fechaActual = date.toISOString().split('T')[0];
    const horaActual = date.toLocaleString().split(',')[1].substring(1, 6);
    const fechaSalida = Date.parse(fechaActual + ' ' + horaActual);
    if (fechaSalida > this.fechaDB) {
      return true;
    }
    if (fechaSalida < this.fechaDB) {
      return false;
    }
    console.log(fechaActual);
    console.log(horaActual);
    console.log(fechaSalida);
    console.log(this.fechaDB);
  }

  idusuario() {
    return localStorage.getItem('idusuario');
  }


  async canDismiss() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Que quiere hacer con su reserva?',
      buttons: [
        {
          text: 'Modificar reserva',
          role: 'edit'
        },
        {
          text: 'Cancelar reserva',
          role: 'destructive'
        }
      ]
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();

    if (role === 'destructive') {
          this.reservaService
        .putReserva(this.reserva)
        .subscribe(x => console.log('x', x));
          window.location.reload();
      console.log(this.reserva);
      return true;
    }
    if (role === 'edit') {
      this.storeName();
      this.router.navigate(this.link)
        .then(() => {
          this.router.navigate(this.link);
          window.location.reload();
        });
      return true;
    }

    return false;
  }


  cancelar() {
    const idreserva = 'idreserva';
    const id = (this.ultimaReserva.idreserva).toString();
    localStorage.setItem(idreserva, (id));
  }


  storeName() {
   //seguir aqui
    this.ultimaReserva = this.allReserva[0];
    const usuario = 'usuario';
    const idreserva = 'idreserva';
    const update = 'update';
    const id = (this.ultimaReserva.idreserva).toString();
    const isupdate = 'yes';
    const usuarioid = (this.ultimaReserva.fkidusuario.toString());
    localStorage.setItem(idreserva, (id));
    localStorage.setItem(update, (isupdate));
    localStorage.setItem(usuario, (usuarioid));

    console.log(isupdate);
    console.log(id);
    console.log(usuario);
  }

  refresh(){
    window.location.reload();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  allService: Servicio[];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  allReserva: Reserva[];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  ultimaReserva: Reserva;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  allUser: Usuario[];


}







