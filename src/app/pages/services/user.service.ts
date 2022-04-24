import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post<any>(
      `${environment.baseUrl}api/login`,
      user
    );
  }
  register(data: any) {
    return this.http.post<any>(
      `${environment.baseUrl}api/register`,
      data
    );
  }
  getAllCustomers(user: any) {
    return this.http.get<any>(
      `${environment.baseUrl}api/customers`,
      user
    )
  }
  getCustomer() {
    return this.http.get<any>(
      `${environment.baseUrl}api/customers/:id`,
    )
  }
  
}
