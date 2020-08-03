import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  public usuario: Usuario;
  userSubs: Subscription;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.userSubs = this.store.select('user')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( ({user}) => {
        this.usuario = user;
      });
  }

  ngOnDestroy(){
    this.userSubs?.unsubscribe();
  }

}
