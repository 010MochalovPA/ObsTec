import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Collection, CollectionAddress, CollectionChild, Message } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  constructor(private http: HttpClient) {}

  fetch(collection: string): Observable<Collection[]> {
    return this.http.get<Collection[]>(`/api/${collection}`);
  }

  fetchAddress(): Observable<CollectionAddress[]> {
    return this.http.get<CollectionAddress[]>(`/api/address`);
  }

  fetchChild(collection: string, parentId: string): Observable<CollectionChild[]> {
    return this.http.get<CollectionChild[]>(`/api/${collection}/${parentId}`);
  }

  create(collection: string, item: Collection): Observable<Collection> {
    return this.http.post<Collection>(`/api/${collection}`, item);
  }

  createAddress(item: CollectionAddress): Observable<CollectionAddress> {
    return this.http.post<CollectionAddress>(`/api/address`, item);
  }

  createChild(collection: string, item: CollectionChild): Observable<CollectionChild> {
    return this.http.post<CollectionChild>(`/api/${collection}`, item);
  }

  delete(collection: string, item: Collection): Observable<Message> {
    return this.http.delete<Message>(`/api/${collection}/${item._id}`);
  }
  deleteAddress(item: CollectionAddress): Observable<Message> {
    return this.http.delete<Message>(`/api/address/${item._id}`);
  }
  update(collection: string, item: Collection, itemID: string | undefined): Observable<Collection> {
    return this.http.patch<Collection>(`api/${collection}/${itemID}`, item);
  }
  updateAddress(item: CollectionAddress, itemID: string | undefined): Observable<CollectionAddress> {
    return this.http.patch<CollectionAddress>(`api/address/${itemID}`, item);
  }
  updateChild(collection: string, item: Collection, itemID: string | undefined): Observable<CollectionChild> {
    return this.http.patch<CollectionChild>(`api/${collection}/${itemID}`, item);
  }
}
