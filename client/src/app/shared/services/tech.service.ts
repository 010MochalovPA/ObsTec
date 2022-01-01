import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TechService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<Device[]> {
    return this.http.get<Device[]>('/api/device');
  }
}
