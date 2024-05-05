import { UserService } from 'shared/services/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { switchMap } from 'rxjs/operators';

@Injectable()

export class AuthService {
  user$: Observable<firebase.default.User> | any;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
    .pipe(
      switchMap((user: any) => 
        {
          if (user) return this.userService.get(user.uid).valueChanges()
          return of(null)
        })
    )
  }

}