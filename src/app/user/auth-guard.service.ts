import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from './../common/toastr.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService) { }

  canActivate(ARS: ActivatedRouteSnapshot, RState: RouterStateSnapshot): boolean {
    return this.checkLoggedIn(RState.url);
  }
  checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    this.toastrService.info("Please login to access this page");
    this.router.navigate(['/login']);
    return false;
  }

}
