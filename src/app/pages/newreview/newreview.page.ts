import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';

interface Review {
  idreview: number;
  estrellas: number;
  opiniones: string;
  fkidusuario: number;
}

enum COLORS {
  GREY = '#949494',
  YELLOW = '#FFFF33',
}


@Component({
  selector: 'app-newreview',
  templateUrl: './newreview.page.html',
  styleUrls: ['./newreview.page.scss'],
})
export class NewreviewPage implements OnInit {


  @Input() rating: number;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  idreview: number;
  estrellas: number;
  opiniones: string;
  fkidusuario: number;
  datos: Review;

  constructor(private reviewService: ReviewService, private router: Router) { }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  star: number;

  ngOnInit() {
  }



  agregarReview(formulario: NgForm) {
    // eslint-disable-next-line prefer-const
    let controls = formulario.form.controls;
    this.estrellas = this.star;
    this.opiniones = controls.inputopinion.value;



    console.log(controls.inputopinion.value);


    this.datos = {
      idreview: null,
      estrellas: this.star,
      opiniones: this.opiniones,
      fkidusuario: Number(localStorage.getItem('idusuario')),
    };

    if (this.estrellas > 0 && this.opiniones.length > 0) {
      this.reviewService
        .postReview(this.datos)
        .subscribe(x => console.log('x', x));

      this.router.navigate(['/inicio'])
        .then(() => {
          window.location.reload();
        });
    }
  }
  rate(index: number) {
    console.log(index);
    this.rating = index;
    this.star = index;
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

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }
}
