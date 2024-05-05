import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth.service';
import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(private auth: AuthService, private userService: UserService) { }
 
  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .pipe(map((appUser:any) => appUser.isAdmin));
  }
}
