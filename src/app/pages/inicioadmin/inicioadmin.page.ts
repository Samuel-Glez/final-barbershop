import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

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
  selector: 'app-inicioadmin',
  templateUrl: './inicioadmin.page.html',
  styleUrls: ['./inicioadmin.page.scss'],
})
export class InicioadminPage implements OnInit {

  idusuario: number;
  idrol: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService
      .getUsuario()
      .subscribe((datos: Usuario[]) => {
        this.allUser = datos.filter(u => u.idusuario === Number(localStorage.getItem('idusuario')));
        this.idusuario = this.allUser[0].idusuario;
        this.idrol = this.allUser[0].fkidrol;
        console.log(this.allUser);
      });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  allUser: Usuario[];

}
