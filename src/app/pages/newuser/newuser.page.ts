import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';

interface Usuario {
  idusuario: number;
  nombre: string;
  apellidos: string;
  telefono: number;
  email: string;
  password: string;
  password2: string;
  fkidrol: number;
}

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.page.html',
  styleUrls: ['./newuser.page.scss'],
})
export class NewuserPage implements OnInit {

  nombre: string;
  apellidos: string;
  telefono: number;
  email: string;
  password: string;
  password2: string;
  fkidrol: number;
  datos: Usuario;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }


  agregarUsuario(formulario: NgForm) {
    // eslint-disable-next-line prefer-const
    let controls = formulario.form.controls;
    this.nombre = controls.inputnombre.value;
    this.apellidos = controls.inputapellidos.value;
    this.telefono = controls.inputtelefono.value;
    this.email = controls.inputemail.value;
    this.password = controls.inputpassword.value;
    this.password2 = controls.inputpassword2.value;

    console.log(controls.inputnombre.value);
    console.log(controls.inputapellidos.value);
    console.log(controls.inputtelefono.value);
    console.log(controls.inputemail.value);
    console.log(controls.inputpassword.value);
    console.log(controls.inputpassword2.value);

    this.datos = {
      idusuario: null,
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      telefono: this.telefono,
      password: this.password,
      password2: this.password,
      fkidrol: 2
    };

    if (this.password === this.password2) {
      if (this.nombre.length > 0 && this.apellidos.length > 0 && this.telefono > 0 && this.email.length > 0 && this.password.length > 0) {
        this.userService
          .postUsuario(this.datos)
          .subscribe(x => console.log('x', x));
        if (localStorage.getItem('idrol') === '1') {
          this.router.navigate(['inicioadmin'])
            .then(() => {
              window.location.reload();
            });
        }

        if (localStorage.getItem('idrol') !== '1') {
          this.router.navigate([''])
            .then(() => {
              window.location.reload();
            });
        }

      }
    }
  }
}
