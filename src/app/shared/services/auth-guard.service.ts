import { AuthService } from 'shared/services/auth.service';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: any, state: RouterStateSnapshot) {
    return this.auth.user$
      .pipe(map((user: any) => {
      if (user) return true;

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false; 
    }));
  }
}
