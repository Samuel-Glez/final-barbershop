import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Servicio{
  idservicio: number;
  precio: number;
  servicio: string;
  tiempo: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

getservicio(){
  return this.http.get('http://localhost:8080/api/servicio');
}

getServicioId(id: number) {
  return this.http.get(`http://localhost:8080/api/servicio/${id}`);
}

deleteServicioId(id: number) {
  return this.http.delete(`http://localhost:8080/api/servicio/${id}`);
}

postServicio(servicio: Servicio) {
  const headers = { 'content-type': 'application/json' };
  const body = JSON.stringify(servicio);
  console.log(body);
  console.log(servicio);
  return this.http.post('http://localhost:8080/api/servicio', servicio);
}

putservicio(servicio: Servicio) {
  const headers = { 'content-type': 'application/json' };
  const body = JSON.stringify(servicio);
  const id: number = servicio.idservicio;
  console.log(body);
  console.log(servicio);
  return this.http.put(`http://localhost:8080/api/servicio/${id}`, servicio);
}

}
