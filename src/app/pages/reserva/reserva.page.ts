import { ReservaService } from './../../services/reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { isWeekend } from 'date-fns';

interface Reserva {
  idreserva: number;
  fecha: string;
  hora: string;
  servicio: Servicio[];
  usuario: Usuario[];
}

interface Reserva2 {
  idreserva: number;
  fecha: string;
  hora: string;
  ordenhora: number;
  horacancelada: string;
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
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  allServicio: Servicio = {
    idservicio: null,
    precio: null,
    servicio: '',
    tiempo: null
  };

  datos: Reserva2;
  reserva: Reserva2;
  idpeluquero: number;
  horaseleccionada: string;
  fechaseleccionada: string;
  orden: number;
  chora: string[] = new Array();;
  horasUnidas: string;
  horasFinales: string[] = new Array();
  horasReserva: string[] = new Array();
  horasReservaSTR: string[] = new Array();
  ultimaReserva1: number;
  ultimaReserva2: string;
  idusuario: number;
  horaDB: string;

  horas: string[] = [
    '9:00',
    '9:15',
    '9:30',
    '9:45',
    '10:00',
    '10:15',
    '10:30',
    '10:45',
    '11:00',
    '11:15',
    '11:30',
    '11:45',
    '12:00',
    '12:15',
    '12:30',
    '12:45',
    '15:00',
    '15:15',
    '15:30',
    '15:45',
    '16:00',
    '16:15',
    '16:30',
    '16:45',
    '17:00',
    '17:15',
    '17:30',
    '17:45',
    '18:00',
    '18:15',
    '18:30',
    '18:45'
  ];




  constructor(private reservaService: ReservaService, private activatedRouted: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = Number(localStorage.getItem('idreserva'));
    this.reservaService.getReservaId(id)
      .subscribe((datos: Reserva2) => {
        this.reserva = datos;
        this.ultimaReserva1 = this.reserva.fkidpeluquero;
        this.ultimaReserva2 = this.reserva.fecha;
        console.log(this.ultimaReserva1);
        console.log(this.reserva);
      });

    this.activatedRouted.paramMap.subscribe(params => {
      const id2 = Number(params.get('id'));
      this.reservaService.getServicioId(id2)
        .subscribe((datos: Servicio) => {
          this.allServicio = datos;
          console.log(this.allServicio);
        });
    });


    this.reservaService
      .getUsuario()
      .subscribe((datos: Usuario[]) => {
        this.allUser = datos.filter(u => u.fkidrol === 3 || u.fkidrol === 1);
        console.log(this.allUser);
        if(localStorage.getItem('update')){
          this.selecteduser(this.ultimaReserva1);
        }
        if(!localStorage.getItem('update')){
          this.selecteduser(this.allUser[0].idusuario);
        }

      });


    const date = new Date();
    this.fechaseleccionada = date.toISOString().split('T')[0];
    console.log(this.fechaseleccionada);

      this.reservaService
      .getReserva()
      .subscribe((datos: Reserva2[]) => {
        this.allReserva = datos.filter(r => r.fecha.includes(this.fechaseleccionada));
        this.validarFecha();

        console.log(this.allReserva);
      });


    console.log(this.horasFinales);
    console.log(this.horas);
    console.log(localStorage.getItem('idservicio'));
    console.log(localStorage.getItem('idreserva'));
    console.log(localStorage.getItem('update'));
    this.usuario();
  }

  reservaForm(formulario: NgForm) {

    console.log(this.allServicio.tiempo);

    this.datos = {
      idreserva: null,
      fecha: this.fechaseleccionada,
      hora: this.horasUnidas,
      horacancelada: null,
      ordenhora: this.orden,
      duracion: this.allServicio.tiempo,
      fkidservicio: this.allServicio.idservicio,
      fkidusuario: Number(localStorage.getItem('idusuario')),
      fkidpeluquero: this.idpeluquero,
      status: 'Confirmada'
    };


    this.reserva = {
      idreserva: Number(localStorage.getItem('idreserva')),
      fecha: this.fechaseleccionada,
      hora: this.horasUnidas,
      horacancelada: null,
      ordenhora: this.orden,
      duracion: this.allServicio.tiempo,
      fkidservicio: this.allServicio.idservicio,
      fkidusuario: Number(localStorage.getItem('usuario')),
      fkidpeluquero: this.idpeluquero,
      status: 'Confirmada'
    };

    console.log(localStorage.getItem('update'));


    if (localStorage.getItem('update') === 'yes') {
      this.reservaService
        .putReserva(this.reserva)
        .subscribe(x => console.log('x', x));
        if(localStorage.getItem('idrol') === '3' || '1'){
          this.router.navigate(['inicioadmin'])
          .then(() => {
            window.location.reload();
          });
        console.log(localStorage.getItem('idreserva'));
        }
        if(localStorage.getItem('idrol') === '2'){
          this.router.navigate(['inicio'])
          .then(() => {
            window.location.reload();
          });
        console.log(localStorage.getItem('idreserva'));
        }

    } else {
      this.reservaService
        .postReserva(this.datos)
        .subscribe(x => console.log('x', x));
      this.router.navigate(['inicio'])
        .then(() => {
          this.router.navigate(['inicio']);
          window.location.reload();
        });
    }

    console.log(this.allServicio.idservicio);
    console.log(this.idpeluquero);
    console.log(this.fechaseleccionada);

  }

  usuario(){
    if(localStorage.getItem('idrol') === '2'){
       this.idusuario = Number(localStorage.getItem('idusuario'));
    }
    if(localStorage.getItem('idrol') === '3' || '1'){
      this.idusuario = Number(localStorage.getItem('usuario'));
    }
  }

  selecteduser(id: number) {
    this.idpeluquero = id;
    this.reservaService
      .getReserva()
      .subscribe((datos: Reserva2[]) => {
        this.allReserva = datos.filter(r => r.fkidpeluquero === this.idpeluquero && r.fecha.includes(this.fechaseleccionada));
        console.log(this.allReserva);
        console.log(this.fechaseleccionada);
        const date1 = new Date();
        const fechaActual = date1.toISOString().split('T')[0];
        if (this.fechaseleccionada !== fechaActual) {
          this.horasFinales = [];
          this.validarFecha();
        }
        if (this.fechaseleccionada === fechaActual) {
          this.horasFinales = [];
          this.validarFecha();
        }
      });
    console.log(this.idpeluquero);
  }

  selectedhour(hora: string) {
    this.horaseleccionada = hora;
    this.chora = this.horaseleccionada.split(':');
    this.orden = Number(this.chora[0] + this.chora[1]);
    console.log(this.orden);
    for (let i = 0; i < this.horas.length; i++) {
      if (this.horaseleccionada === this.horas[i]) {
        if (this.allServicio.tiempo === 15) {
          this.horasUnidas = this.horas[i];

        }
        if (this.allServicio.tiempo === 30) {
           this.horasUnidas = this.horas[i] + ',' + this.horas[i + 1];
           if(this.horaseleccionada === '12:45'){
            this.horasUnidas = this.horas[i];
           }
           if(this.horaseleccionada === '18:45'){
            this.horasUnidas = this.horas[i];
           }
        }


        if (this.allServicio.tiempo === 45) {
          this.horasUnidas = this.horas[i] + ',' + this.horas[i + 1] + ',' + this.horas[i + 2];
          if(this.horaseleccionada === '12:45'){
            this.horasUnidas = this.horas[i];
           }
           if(this.horaseleccionada === '18:45'){
            this.horasUnidas = this.horas[i];
           }
        }

        console.log(this.horasUnidas);
      }
    }
    console.log(this.horaseleccionada);
  }

  isDanger2(user: number) {
    if (this.idpeluquero === user) {
      return true;
    } else {
      return false;
    }
  }

  isDanger(hora: string) {
    if (this.horaseleccionada === hora) {
      return true;
    } else {
      return false;
    }
  }


  passedDate(selectedDate) {
    const date = new Date(selectedDate.detail.value);
    console.log(selectedDate.detail.value);
    this.fechaseleccionada = date.toISOString().split('T')[0];
    const day = new Date(this.fechaseleccionada).getDay();
    console.log(this.fechaseleccionada);
    this.reservaService
      .getReserva()
      .subscribe((datos: Reserva2[]) => {
        this.allReserva = datos.filter(r => r.fkidpeluquero === this.idpeluquero && r.fecha.includes(this.fechaseleccionada));
        console.log(this.allReserva);
        const date1 = new Date();
        const fechaActual = date1.toISOString().split('T')[0];
        if (this.fechaseleccionada !== fechaActual) {
          this.horasFinales = [];
          this.validarFecha();
        }
        if (this.fechaseleccionada === fechaActual) {
          this.horasFinales = [];
          this.validarFecha();
        }
        if (day === 0){
          this.horasFinales = [];
        }

      });

    console.log(date.toISOString().split('T')[0]);
  }

  validarFecha() {
    this.horasReserva = [];
    console.log(this.allReserva);
    this.allReserva.forEach(reserva => {
      this.horasReserva.push(reserva.hora);
      this.horasReservaSTR = this.horasReserva.toString().split(',');
      this.horasReserva = [];
      this.horasReserva = this.horasReservaSTR;
    });
    console.log(this.horasReserva);
    if (this.horasReserva) {
      this.horas.forEach((hora) => {
        if (!this.horasReserva.includes(hora)) {
          this.fechaActual(hora);
         // this.horasFinales.push(hora);
        }
      });
    } else {
      this.horasFinales = this.horas;
    }
    console.log(this.horasFinales);
    this.horaDB = this.horasFinales[0];
    console.log(this.horaDB);
  }

  onClick() {
    return localStorage.getItem('update');
  }

  fechaActual(hora: string) {
    const date = new Date();
    const fechaActual = date.toISOString().split('T')[0];
    const horaActual = date.toLocaleString().split(',')[1].substring(1, 6);
    const fechaSalida = Date.parse(fechaActual + ' ' + horaActual);
    const fechaDB = Date.parse(this.fechaseleccionada + ' ' + hora);
    if (fechaSalida < fechaDB) {
      this.horasFinales.push(hora);
    }


    console.log(fechaActual);
    console.log(horaActual);
    console.log(fechaSalida);
    console.log(fechaDB);
  }



  // eslint-disable-next-line @typescript-eslint/member-ordering
  allUser: Usuario[];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  allReserva: Reserva2[];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  update: Reserva2[];

}

