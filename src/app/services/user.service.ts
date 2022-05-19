import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
export class UserService {

  constructor(private http: HttpClient) { }

  getUsuario() {
    return this.http.get('http://localhost:8080/api/usuarios');
  }

  getUsuarioId(id: number) {
    return this.http.get(`http://localhost:8080/api/usuarios/${id}`);
  }

  deleteUsuarioId(id: number) {
    return this.http.delete(`http://localhost:8080/api/usuarios/${id}`);
  }

  postUsuario(usuario: Usuario) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(usuario);
    console.log(body);
    console.log(usuario);
    return this.http.post('http://localhost:8080/api/usuarios', usuario);
  }

  putusuario(usuario: Usuario) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(usuario);
    const id: number = usuario.idusuario;
    console.log(body);
    console.log(usuario);
    return this.http.put(`http://localhost:8080/api/usuarios/${id}`, usuario);
  }
}
