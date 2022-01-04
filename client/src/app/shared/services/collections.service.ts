import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  constructor(private http: HttpClient) {}

  fetchVendor(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>('/api/vendor');
  }
  createVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>('/api/vendor', vendor);
  }
  // removeVendor(vendorId: string): Observable<Vendor> {
  //   return this.http.post<Vendor>(`/api/vendor/${vendorId}`);
  // }
}
