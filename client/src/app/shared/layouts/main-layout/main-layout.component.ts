import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  username: string | null = '';
  mainLinks = [
    { url: '/audit', name: 'Учет техники', disable: false },
    { url: '/acts', name: 'Акты выполненых работ', disable: false },
    { url: '/phonebook', name: 'Телефонный справочник', disable: true },
    { url: '/video', name: 'Записи видеоконференций', disable: true },
  ];

  MainDescription = '';

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    // console.log(this.router.url);
    this.username = this.auth.getUsername();
    // console.log(this.username);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
