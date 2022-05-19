import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { ReservaService } from './../../services/reserva.service';
import { Component, OnInit } from '@angular/core';
import differenceInCalendarWeeksWithOptions from 'date-fns/esm/fp/differenceInCalendarWeeksWithOptions/index.js';

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
  fkidrol: number;
}

interface Servicio {
  idservicio: number;
  precio: number;
  servicio: string;
  tiempo: number;
}

@Component({
  selector: 'app-listreserva',
  templateUrl: './listreserva.page.html',
  styleUrls: ['./listreserva.page.scss'],
})
export class ListreservaPage implements OnInit {

  fechaActual: string;
  status: string;
  reserva: Reserva;


  constructor(private reservaService: ReservaService, private router: Router, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    const fechaActual = new Date();
    this.passedDate(fechaActual.toISOString().split('T')[0], true);
  }

  passedDate(selectedDate, isFechaActual) {
    if (!isFechaActual) {
      const date = new Date(selectedDate.detail.value);
      console.log(selectedDate.detail.value);
      this.fechaActual = date.toISOString().split('T')[0];
    } else {
      this.fechaActual = selectedDate;
    }

    this.reservaService
      .getReserva()
      .subscribe((datos: Reserva[]) => {
        const datosReserva = datos.filter(r => r.fecha.includes(this.fechaActual));
        datosReserva.forEach(reserva => {
          reserva.hora = reserva.hora.split(',')[0];
          console.log(reserva.idreserva);
          console.log(this.status);
        });
        this.allReserva = datosReserva;
        this.allReserva = this.allReserva.sort(((a, b) => a.ordenhora - b.ordenhora));
        console.log(this.allReserva.sort(((a, b) => a.ordenhora - b.ordenhora)));
      });

    this.reservaService
      .getUsuario()
      .subscribe((datos: any) => {
        console.log(datos);
        this.allUser = datos;
      });

    this.reservaService
      .getservicio()
      .subscribe((datos: any) => {
        console.log(datos);
        this.allServicio = datos;
      });
  }

  async canDismiss(idreserva: number, hora: string,idservicio: number,idusuario: number) {
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
      this.reservaService.getReservaId(idreserva)
      .subscribe((datos: Reserva) => {
        datos.horacancelada = hora;
        datos.hora = '';
        datos.status = 'Cancelada';
        this.reserva = datos;
        this.reservaService
        .putReserva(this.reserva)
        .subscribe(x => console.log('x', x));
        this.router.navigate(['inicioadmin'])
        .then(() => {
          window.location.reload();
        });

      console.log(this.reserva);
      });

      return true;
    }
    if (role === 'edit') {
    const reservaid = 'idreserva';
    const usuario = 'usuario';
    const update = 'update';
    const id = (idreserva.toString());
    const usuarioid = (idusuario.toString());
    const isupdate = 'yes';
    localStorage.setItem(reservaid, (id));
    localStorage.setItem(update, (isupdate));
    localStorage.setItem(usuario, (usuarioid));
      this.router.navigate(['reserva/'+ idservicio])
        .then(() => {
          this.router.navigate(['reserva/'+ idservicio]);
          window.location.reload();
        });


      return true;
    }

    return false;
  }




  /*refresh() {
    this.router.navigate(['listreserva'])
      .then(() => {
        window.location.reload();
      });
  }*/

  idusuario() {
    return Number(localStorage.getItem('idusuario'));
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  allUser: Usuario[];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  allReserva: Reserva[];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  allServicio: Servicio[];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  ultimaReserva: Reserva;

}


