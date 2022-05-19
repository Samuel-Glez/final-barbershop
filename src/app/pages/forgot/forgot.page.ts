import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Usuario {
  idusuario: number;
  nombre: string;
  apellidos: string;
  telefono: number;
  email: string;
  password: string;
  fkidrol: number;
}

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  email: string;
  telefono: number;
  ruta: string;
  idservicio: number;
  link: string[];
  password: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  allUser: Usuario[];

  forgot(formulario: NgForm) {
    const controls = formulario.form.controls;
    this.email = controls.inputemail.value;
    this.telefono = controls.inputtelefono.value;
    console.log(controls.inputemail.value);
    console.log(controls.inputtelefono.value);

    this.userService
      .getUsuario()
      .subscribe((datos: Usuario[]) => {
        this.allUser = datos.filter(u => u.email.includes(controls.inputemail.value));
        this.idservicio = this.allUser[0].idusuario;
        this.ruta = 'edituser/' + this.idservicio.toString();
        this.link = [this.ruta];
        if (this.allUser) {
          this.validar(this.telefono, this.allUser);
        } else {
          console.log('no existe el usuario');
        }
      });
  }

  validar(telefonoFront: number, allsuer: Usuario[]) {
    if (telefonoFront === this.allUser[0].telefono) {
      this.password = allsuer[0].password;
    }

  }

  yourPassword() {
    return this.password;
  }



}
