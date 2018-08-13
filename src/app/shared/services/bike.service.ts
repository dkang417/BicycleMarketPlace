import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Bike } from '../../bike';


@Injectable({
  providedIn: 'root'
})
export class BikeService {

  private base = '/api/bikes';

  constructor(private http: HttpClient) { }

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.base);
  }

  getBike(id: string): Observable<Bike> {
    return this.http.get<Bike>(`${this.base}/${id}`);
  }

  searchBikes(search: string): any {
    return this.http.get(`${this.base}/${search}`);
  }

  createBike(bike: Bike): Observable<Bike> {
    return this.http.post<Bike>(this.base, bike);
  }

  updateBike(id: string, bike: Bike): Observable<Bike> {
    return this.http.put<Bike>(`${this.base}/${id}`, bike);
  }

  deleteBike(bike: Bike): Observable<Bike> {
    return this.http.delete<Bike>(`${this.base}/${bike._id}`);
  }


}

