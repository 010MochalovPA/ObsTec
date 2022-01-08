import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Collection, CollectionChild, Message } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  constructor(private http: HttpClient) {}

  fetch(collection: string): Observable<Collection[]> {
    return this.http.get<Collection[]>(`/api/${collection}`);
  }

  fetchChild(collection: string, parentId: string): Observable<CollectionChild[]> {
    return this.http.get<CollectionChild[]>(`/api/${collection}/${parentId}`);
  }

  create(collection: string, item: Collection): Observable<Collection> {
    return this.http.post<Collection>(`/api/${collection}`, item);
  }

  createChild(collection: string, item: CollectionChild): Observable<CollectionChild> {
    return this.http.post<CollectionChild>(`/api/${collection}`, item);
  }

  delete(collection: string, item: Collection): Observable<Message> {
    return this.http.delete<Message>(`/api/${collection}/${item._id}`);
  }
  update(collection: string, item: Collection, itemID: string | undefined): Observable<Collection> {
    return this.http.patch<Collection>(`api/${collection}/${itemID}`, item);
  }
  updateChild(collection: string, item: Collection, itemID: string | undefined): Observable<CollectionChild> {
    return this.http.patch<CollectionChild>(`api/${collection}/${itemID}`, item);
  }
}
