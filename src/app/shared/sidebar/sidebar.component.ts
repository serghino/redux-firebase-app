import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  public usuario: Usuario;
  userSubs: Subscription;

  constructor( private authService: AuthService,
               private router: Router,
               private store: Store<AppState> ) { }

  ngOnInit() {
    this.userSubs = this.store.select('user')
                      .pipe(
                        filter( ({user}) => user != null )
                      )
                      .subscribe( ({ user }) => this.usuario = user );
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

  logout() {
    this.authService.logout().then( () => {
      this.router.navigate(['/login']);
    })

  }

}
