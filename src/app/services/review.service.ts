import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getReview() {
    return this.http.get('http://localhost:8080/api/review');
  }

  getReviewId(id: number) {
    return this.http.get(`http://localhost:8080/api/review/${id}`);
  }

  getUsuarios() {
    return this.http.get(`http://localhost:8080/api/usuarios`);
  }

  deleteReviewId(id: number) {
    return this.http.delete(`http://localhost:8080/api/review/${id}`);
  }

  postReview(review: Review) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(review);
    console.log(body);
    console.log(review);
    return this.http.post('http://localhost:8080/api/review', review);
  }

  putReview(review: Review) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(review);
    const id: number = review.idreview;
    console.log(body);
    console.log(review);
    return this.http.put(`http://localhost:8080/api/review/${id}`, review);
  }
}
