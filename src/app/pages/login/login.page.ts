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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;




  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  allUser: Usuario[];

  login(formulario: NgForm) {
    const controls = formulario.form.controls;
    this.email = controls.inputemail.value;
    this.password = controls.inputpassword.value;
    console.log(controls.inputemail.value);
    console.log(controls.inputpassword.value);

    this.userService
      .getUsuario()
      .subscribe((datos: Usuario[]) => {
        this.allUser = datos.filter(u => u.email.includes(controls.inputemail.value));
        if (this.allUser) {
          this.validar(this.password, this.allUser);
        } else {
          console.log('no existe el usuario');
        }
      });
  }

  storeName() {
    const idusuario = 'idusuario';
    const idrol = 'idrol';
    localStorage.setItem(idusuario, (this.allUser[0].idusuario).toString());
    localStorage.setItem(idrol, (this.allUser[0].fkidrol).toString());
  }

  validar(passwordFront: string, allsuer: Usuario[]) {
    if (passwordFront === this.allUser[0].password) {

      if (this.allUser[0].fkidrol === 1) {
        this.storeName();
        this.router.navigate(['inicioadmin'])
          .then(() => {
            window.location.reload();
          });
      }
      if (this.allUser[0].fkidrol === 3) {
        this.storeName();
        this.router.navigate(['inicioadmin'])
          .then(() => {
            window.location.reload();
          });
      }

      if (this.allUser[0].fkidrol === 2) {
        this.storeName();
        this.router.navigate(['inicio'])
          .then(() => {
            window.location.reload();
          });
      }

    }

  }
}
