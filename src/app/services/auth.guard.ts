import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
                private router: Router ) {}
  // This is useful when we use lazyLoad in routes childs.
  canLoad(): Observable<boolean>{
    return this.authService.isAuth()
        .pipe(
          tap( estado => {
            if ( !estado ) { this.router.navigate(['/login'])}
          }),
          // take (1) because we need to restored every call.
          take(1)
        );
  }

  canActivate(): Observable<boolean>{
    return this.authService.isAuth()
        .pipe(
          tap( estado => {
            if ( !estado ) { this.router.navigate(['/login'])}
          })
        );
  }
  
}
