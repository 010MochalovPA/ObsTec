import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tech-layout',
  templateUrl: './tech-layout.component.html',
  styleUrls: ['./tech-layout.component.scss'],
})
export class TechLayoutComponent implements OnInit {
  techLinks = [
    { url: '/audit/overview', name: 'Обзор' },
    { url: '/audit/tech', name: 'Вычислительная техника' },
    { url: '/audit/collections', name: 'Справочники' },
    { url: '/audit/persons', name: 'Сотрудники' },
    { url: '/audit/ipaddresses', name: 'IP-адреса' },
    { url: '/audit/spares', name: 'Запасные части' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
