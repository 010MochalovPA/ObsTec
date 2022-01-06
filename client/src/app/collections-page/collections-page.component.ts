import { Component, OnInit } from '@angular/core';
import { CollectionsList } from '../shared/interfaces';

@Component({
  selector: 'app-collections-page',
  templateUrl: './collections-page.component.html',
  styleUrls: ['./collections-page.component.scss'],
})
export class CollectionsPageComponent implements OnInit {
  collectionsItems: CollectionsList[] = [
    { title: 'Производители', name: 'Производитель', url: 'vendor' },
    { title: 'Типы устройств', name: 'Тип устройства', url: 'devicetype' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
