import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tech-layout',
  templateUrl: './tech-layout.component.html',
  styleUrls: ['./tech-layout.component.scss'],
})
export class TechLayoutComponent implements OnInit {
  techLinks = [
    { url: '/audit/overview', name: 'Обзор', disabled: false },
    { url: '/audit/tech', name: 'Вычислительная техника', disabled: false },
    { url: '/audit/collections', name: 'Справочники', disabled: false },
    { url: '/audit/persons', name: 'Сотрудники', disabled: true },
    { url: '/audit/ipaddresses', name: 'IP-адреса', disabled: true },
  ];
  constructor() {}

  ngOnInit(): void {}
}
