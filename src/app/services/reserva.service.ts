import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Reserva{
  idreserva: number;
  fecha: string;
  hora: string;
  servicio: Servicio[];
  usuario: Usuario[];
}

interface Reserva2 {
  idreserva: number;
  fecha: string;
  hora: string;
  ordenhora: number;
  duracion: number;
  fkidservicio: number;
  fkidusuario: number;
  fkidpeluquero: number;
  status: string;
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

interface Servicio{
  idservicio: number;
  precio: number;
  servicio: string;
  tiempo: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  getReserva() {
    return this.http.get('http://localhost:8080/api/reserva');
  }

  getservicio(){
    return this.http.get('http://localhost:8080/api/servicio');
  }

  getUsuario() {
    return this.http.get('http://localhost:8080/api/usuarios');
  }

  getReservaId(id: number) {
    return this.http.get(`http://localhost:8080/api/reserva/${id}`);
  }
  getUsuarioId(id: number) {
    return this.http.get(`http://localhost:8080/api/usuarios/${id}`);
  }

  getServicioId(id: number) {
    return this.http.get(`http://localhost:8080/api/servicio/${id}`);
  }

  deleteReservaId(id: number) {
    return this.http.delete(`http://localhost:8080/api/reserva/${id}`);
  }

  postReserva(reserva: Reserva2) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(reserva);
    console.log(body);
    console.log(reserva);
    return this.http.post('http://localhost:8080/api/reserva', reserva);
  }

  putReserva(reserva: Reserva2) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(reserva);
    const id: number = reserva.idreserva;
    console.log(body);
    console.log(reserva);
    return this.http.put(`http://localhost:8080/api/reserva/${id}`, reserva);
  }

}
