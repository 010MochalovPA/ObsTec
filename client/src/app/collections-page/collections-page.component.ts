import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CollectionsList } from '../shared/interfaces';
import { CollectionsFormComponent } from './collections-form/collections-form.component';

@Component({
  selector: 'app-collections-page',
  templateUrl: './collections-page.component.html',
  styleUrls: ['./collections-page.component.scss'],
})
export class CollectionsPageComponent implements OnInit {
  @ViewChildren(CollectionsFormComponent)
  childComponents!: CollectionsFormComponent[];

  collectionsItems: CollectionsList[] = [
    { title: 'Производители', name: 'Производитель', url: 'vendor' },
    { title: 'Типы устройств', name: 'Тип устройства', url: 'devicetype' },
    { title: 'Управления ПФР (ТО)', name: 'Управление ПФР', url: 'unit' },
    { title: 'Отделы', parentName: 'Управление', parent: 'unit', name: 'Отдел', url: 'group' },
  ];
  constructor() {}

  ngOnInit(): void {}

  clearSelect() {
    this.childComponents.forEach((child) => {
      child.clearSelect();
    });
  }
}
