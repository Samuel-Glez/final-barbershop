import { Router } from '@angular/router';
import { ReviewService } from './../../services/review.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';



interface Rate {
  readonly: boolean;
  size: Text;
}


interface Review {
  idreview: number;
  estrellas: number;
  opiniones: string;
  fkidusuario: number;
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

enum COLORS {
  GREY = '#949494',
  YELLOW = '#FFFF33',
}

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})

export class ReviewPage implements OnInit {

  @Input() rating: number;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  constructor(private reviewService: ReviewService, private router: Router) { }

  ngOnInit() {

    this.reviewService
      .getReview()
      .subscribe((datos: any) => {
        console.log(datos);
        this.allReview = datos;
      });

    this.reviewService
      .getUsuarios()
      .subscribe((datos: any) => {
        console.log(datos);
        this.allUser = datos;
      });
  }

  rate(index: number) {
    this.rating = index;
    this.ratingChange.emit(this.rating);
  }

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return COLORS.GREY;
    }
    switch (this.rating) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return COLORS.YELLOW;
      default:
        return COLORS.GREY;
    }
  }

  fakeArray(length: number): Array<any> {
    if (length >= 0) {
      return new Array(length);
    }
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }

  atras(idrol: string){
    if (this.idrol() === '1') {
      this.router.navigate(['inicioadmin'])
        .then(() => {
          window.location.reload();
        });
    }

    if (this.idrol() === '3') {
      this.router.navigate(['inicioadmin'])
        .then(() => {
          window.location.reload();
        });
    }

    if (this.idrol() === '2') {
      this.router.navigate(['inicio'])
        .then(() => {
          window.location.reload();
        });
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  allReview: Review[];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  allUser: Usuario[];

  idrol(){
    return localStorage.getItem('idrol');
   }
}
