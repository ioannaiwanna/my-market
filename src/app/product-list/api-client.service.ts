import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductCatalogue } from './product-list.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<ProductCatalogue[]> {
    return this.http.get<ProductCatalogue[]>(`${environment.apiUrl}`);
  }
}
