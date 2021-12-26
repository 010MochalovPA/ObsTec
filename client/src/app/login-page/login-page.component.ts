import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    remember: new FormControl(true),
  });
  ngOnInit(): void {}

  // clearErrors(value: string) {
  //   this.form.controls[value].setErrors(null);
  // }
  matcher = new MyErrorStateMatcher();
  submit() {}
  // startStream() {
  //   console.log(!!this.form.valueChanges.subscribe().closed);
  //   this.form.valueChanges.pipe(debounceTime(4000)).subscribe((values) => {
  //     console.log(values);
  //     for (let value in values) {
  //       if (this.form.controls[value].hasError('required')) {
  //         this.clearErrors(value);
  //       }
  //     }
  //   });
  // }
}
