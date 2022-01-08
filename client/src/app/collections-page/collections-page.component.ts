import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CollectionsList, CollectionsListChild } from '../shared/interfaces';

@Component({
  selector: 'app-collections-page',
  templateUrl: './collections-page.component.html',
  styleUrls: ['./collections-page.component.scss'],
})
export class CollectionsPageComponent implements OnInit {
  @ViewChildren('collectionItem')
  childComponents!: QueryList<any>;

  collectionsItemsBasic: CollectionsList[] = [
    { title: 'Производители', name: 'Производитель', url: 'vendor' },
    { title: 'Типы устройств', name: 'Тип устройства', url: 'devicetype' },
    { title: 'Управления ПФР', name: 'Управление ПФР', url: 'unit' },
  ];
  collectionsItemsChild: CollectionsListChild[] = [
    { title: 'Отделы', name: 'Отдел', url: 'group', parent: { title: 'Управления ПФР', name: 'Управление ПФР', url: 'unit' } },
    // { title: 'Модели', name: 'Модель', url: 'model', parent: { title: 'Производители', name: 'Производитель', url: 'vendor' } },
  ];
  constructor() {}

  ngOnInit(): void {}

  clearSelect($event: any) {
    this.childComponents.forEach((child) => {
      if ($event.tab.textLabel == child.collection.title) {
        child.clearSelect();
        child.ngOnInit();
        if (child.collection.parent) {
          child.clearParent();
        }
      }
    });
  }
}
