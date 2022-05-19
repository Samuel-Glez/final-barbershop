import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';

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
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService
      .getUsuario()
      .subscribe((datos: Usuario[]) => {
        this.allUser = datos.filter(u => u.fkidrol === 3 || u.fkidrol === 1);
        console.log(this.allUser);
      });

      this.userService
      .getUsuario()
      .subscribe((datos: Usuario[]) => {
        this.telUser = datos.filter(u => u.fkidrol === 1);
        console.log(this.telUser);
      });

  }



  

  // eslint-disable-next-line @typescript-eslint/member-ordering
  allUser: Usuario[];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  telUser: Usuario[];

}
