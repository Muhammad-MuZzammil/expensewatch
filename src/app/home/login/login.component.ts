import { Router } from '@angular/router';
import { ToastrService } from './../../common/toastr.service';
import { AuthService } from './../../user/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit() {
  }
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  loginForm: FormGroup = this.fb.group({
    username: this.username,
    password: this.password
  });
  loginUser() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe(data => {
          if (data.json().success === false) {
            this.toastrService.error(data.json().meesage);
          } else {
            this.toastrService.success('Login Successful.');
            this.router.navigate(['report']);
          }
          this.loginForm.reset();
        })
    }
  }
}
