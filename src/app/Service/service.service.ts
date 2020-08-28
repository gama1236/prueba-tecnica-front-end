import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../Model/Response';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:9090/api/codesa/test';

  // tslint:disable-next-line:typedef
  getUsers() {
    return this.http.get<Response>(this.url + '/user/all');
  }

  getRoles() {
    return this.http.get<Response>(this.url + '/rol/get/all');
  }
  saveUser(user: User) {
    return this.http.post<Response>(this.url + '/user/insert', user);
  }

  updateUser(user: User) {
    return this.http.put<Response>(this.url + '/user/update', user);
  }

  deleteUser(id: number) {
    return this.http.delete<Response>(this.url + '/user/delete/' + id);
  }

  getByName(name: string) {
    return this.http.get<Response>(this.url + '/user/get/by/' + name);
  }
}
