import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {}
  ngOnInit() {
    const checkToken = localStorage.getItem('auth-token');
    if (checkToken !== null) {
      this.auth.setToken(checkToken);
    }
  }
}
