import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from './../../common/toastr.service';
import { UserService } from './../user.service';

function comparePassword(c: AbstractControl): { [key: string]: boolean | null } {
  let passwordControl = c.get('password');
  let confirmControl = c.get('retypepass');

  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value) {
    return null;
  }

  return { "mismatchedPassword": true }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService) { }

  firstname = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.email]);
  username = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]);
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')]);
  retypepass = new FormControl('', [Validators.required])

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      passwordGroup: this.fb.group({
        password: this.password,
        retypepass: this.retypepass,
      }, { validator: comparePassword })
    });
  }

  registerUser() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      let theForm = this.registerForm.value;
      const thePass = this.registerForm.value.passwordGroup.password;
      theForm.password = thePass;
      delete theForm.passwordGroup;

      this.userService.register(theForm)
        .subscribe(data => {
          if (data.success === false) {
            this.toastrService.error(data.message);
          }
          else {
            this.toastrService.success(data.message);
            this.router.navigate(['login']);
          }
          this.registerForm.reset();
        });
    }
  }
}
