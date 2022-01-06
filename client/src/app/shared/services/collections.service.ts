import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Collection, Message } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  constructor(private http: HttpClient) {}

  fetch(collection: string): Observable<Collection[]> {
    return this.http.get<Collection[]>(`/api/${collection}`);
  }
  create(collection: string, item: Collection): Observable<Collection> {
    return this.http.post<Collection>(`/api/${collection}`, item);
  }
  delete(collection: string, item: Collection): Observable<Message> {
    return this.http.delete<Message>(`/api/${collection}/${item._id}`);
  }
  update(collection: string, item: Collection, itemID: string | undefined): Observable<Collection> {
    return this.http.patch<Collection>(`api/${collection}/${itemID}`, item);
  }
}
