import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { daysToWeeks } from 'date-fns';

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
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private userService: UserService) { }



  ngOnInit() {
    this.userService
      .getUsuario()
      .subscribe((datos: any) => {
        console.log(datos);
        this.allUser = datos;
      });

  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  allUser: Usuario[];







}
