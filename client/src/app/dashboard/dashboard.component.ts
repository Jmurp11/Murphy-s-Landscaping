import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthStoreService } from '../auth/auth-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private _auth: AuthStoreService
  ) { }

  ngOnInit(): void { }

  navigate(route: string) {
    return this.router.navigate([`/dashboard/${route}`]);
  }

  signOut() {
    this._auth.logout();
  }


}
