import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  username: string | null = '';
  mainLinks = [
    { url: '/tech', name: 'Учет техники', disable: false, description: 'Учет техники Отделения ПФР по Республике Марий Эл' },
    { url: '/acts', name: 'Акты выполненых работ', disable: false, description: 'Акты выполненых работ Отделения ПФР по Республике Марий Эл2' },
    { url: '/phonebook', name: 'Телефонный справочник', disable: true, description: 'Телефонный справочник Отделения ПФР по Республике Марий Эл' },
    { url: '/video', name: 'Записи видеоконференций', disable: true, description: 'Записи конференций Отделения ПФР по Республике Марий Эл' },
  ];

  MainDescription = '';

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    console.log(this.router.url);
    this.username = this.auth.getUsername();
    console.log(this.username);
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
