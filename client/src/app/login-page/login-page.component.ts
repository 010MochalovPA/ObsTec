import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { AuthService } from '../shared/services/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  aSub!: Subscription;
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    remember: new FormControl(true),
  });

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private materialService: MaterialService) {}
  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/audit']);
    }
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.materialService.openSnackBar('Теперь вы можете войти в систему используя стандартный пароль');
      } else if (params['accessDenied']) {
        this.materialService.openSnackBar('Войдите в систему используя пользовательские данные');
      } else if (params['sessionFailed']) {
        this.materialService.openSnackBar('Сессия закончилась, пожалуйста войдите в систему еще раз');
      }
    });
  }
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
  matcher = new MyErrorStateMatcher();
  submit() {
    this.form.disable();
    const user = {
      username: this.form.value.username,
      password: this.form.value.password,
      expiresIn: this.form.value.remember ? 24 : 1,
    };
    this.aSub = this.auth.login(user).subscribe(
      () => {
        this.router.navigate(['/audit/tech']);
      },
      (error) => {
        this.materialService.openSnackBar(error.error.message);
        this.form.enable();
      }
    );
  }
}
