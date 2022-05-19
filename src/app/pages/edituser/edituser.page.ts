import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edituser',
  templateUrl: './edituser.page.html',
  styleUrls: ['./edituser.page.scss'],
})
export class EdituserPage implements OnInit {

  idusuario: number;
  nombre: string;
  apellidos: string;
  telefono: number;
  email: string;
  password: string;
  fkidrol: number;

  allUser: Usuario = {
    idusuario: null,
    nombre: '',
    apellidos: '',
    telefono: null,
    email: '',
    password: '',
    fkidrol: null
  };

  //borrar = false;
  editar = false;
  cerrarsesion = false;



  constructor(private activatedRouted: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.activatedRouted.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.userService.getUsuarioId(id)
        .subscribe((datos: Usuario) => {
          this.allUser = datos;
          console.log(this.allUser);
        });
    });
    console.log(localStorage.getItem('idrol'));
  }


  //borrarUsuario() { this.borrar = true; }
  editarUsuario(): void { this.editar = true; }
  cerrarSesion() { this.cerrarsesion = true; }

  editarForm(formulario: NgForm) {

    console.log(formulario);



    /*if (this.borrar === true) {
      console.log(this.allUser.idusuario);
      this.userService
        .deleteUsuarioId(this.allUser.idusuario)
        .subscribe(x => console.log('x', x));
    }*/

    if (this.editar === true) {
      console.log(this.allUser);
      this.userService
        .putusuario(this.allUser)
        .subscribe(x => console.log('x', x));

      if (localStorage.getItem('idrol') === '1') {
        this.router.navigate(['inicioadmin'])
          .then(() => {
            window.location.reload();
          });
      }

      if (localStorage.getItem('idrol') === '2') {
        this.router.navigate(['inicio'])
          .then(() => {
            window.location.reload();
          });
      }

      if (localStorage.getItem('idrol') === '3') {
        this.router.navigate(['inicioadmin'])
          .then(() => {
            window.location.reload();
          });
      }


    }

    if (this.cerrarsesion === true) {
      this.router.navigate([''])
        .then(() => {
          localStorage.removeItem('idusuario');
          localStorage.removeItem('idrol');
          localStorage.removeItem('update');
          window.location.reload();
        });
    }

  }

  validarrol(idrol: number) {
    const rolglobal = Number(localStorage.getItem('idrol'));
    if (idrol === rolglobal) {
      return true;
    } else {
      return false;
    }
  }

  validarusuario(idusuario: number) {
    const idusuarioglobal = Number(localStorage.getItem('idusuario'));
    if (idusuario === idusuarioglobal) {
      return true;
    } else {
      return false;
    }
  }
}
