import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { CollectionsList, CollectionsListChild } from '../shared/interfaces';

@Component({
  selector: 'app-collections-page',
  templateUrl: './collections-page.component.html',
  styleUrls: ['./collections-page.component.scss'],
})
export class CollectionsPageComponent implements OnInit {
  @ViewChildren('collectionItem')
  childComponents!: QueryList<any>;
  @ViewChild('tabGroup', { static: false }) tab?: MatTabGroup;
  selectedIdx = 0;
  collectionsItemsBasic: CollectionsList[] = [
    { title: 'Производители', name: 'Производитель', url: 'vendor' }, // 0
    { title: 'Типы устройств', name: 'Тип устройства', url: 'devicetype' }, // 1
    { title: 'Запасные части', name: 'Запасная часть', url: 'part' }, // 2
    { title: 'Управления ПФР', name: 'Управление ПФР', url: 'unit' }, // 3
  ];
  collectionsItemsChild: CollectionsListChild[] = [
    { title: 'Отделы', name: 'Отдел', url: 'group', parent: { title: 'Управления ПФР', name: 'Управление ПФР', url: 'unit', parentIndex: 3 } },
    // { title: 'Модели', name: 'Модель', url: 'model', parent: { title: 'Производители', name: 'Производитель', url: 'vendor' } },
  ];
  constructor() {}

  ngOnInit(): void {}

  clearSelect($event: any) {
    this.childComponents.forEach((child) => {
      if ($event.tab.textLabel == child.collection.title) {
        child.clearSelect();
        child.ngOnInit();
        child.form.reset();
        if (child.collection.parent) {
          child.clearParent();
        }
      }
    });
  }
  changeTab($event: number) {
    this.selectedIdx = $event;
  }
}
