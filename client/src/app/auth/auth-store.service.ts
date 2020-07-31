import { Injectable, OnInit } from '@angular/core';
import { StoreState } from '../AppStore';
import { ObservableStore } from '@codewithdan/observable-store';
import { of, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';
import { Router } from '@angular/router';
import { ApolloAngularSDK, MeQuery, LoginInput } from '../generated/graphql';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthStoreService extends ObservableStore<StoreState> implements OnInit {
  private tokenExpirationTimer: any;

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private cookie: CookieService,
    private router: Router
  ) {
    super({ trackStateHistory: true, logStateChanges: true });
    const initalState = {
      currentUser: null
    };
    this.setState(initalState, 'INIT_STATE');
  }

  ngOnInit() { }

  getCurrentUser(): Observable<ApolloQueryResult<MeQuery>> {
    const currentUser = this.getState().currentUser;
    if (currentUser) {
      return of(currentUser);
    } else {
      return this.apolloSdk.meWatch()
        .valueChanges.pipe(
          map(res => {
            this.setState({ currentUser: res }, 'GET_CURRENT_USER');
            return res;
          })
        );
    }
  }

  login(email: string, password: string): any {
    const input: LoginInput = {
      email,
      password
    };

    return this.apolloSdk.login({ data: input })
      .pipe(
        map((res: any) => {
          this.handleAuthentication(res.data.login.success.user,
            {
              accessToken: res.data.login.success.accessToken,
              expiresIn: res.data.login.success.expiresIn
            });
          return res;
        })
      );
  }

  autoLogin() {
    const userData = {
      id: this.cookie.get('id'),
      fullName: this.cookie.get('fullName'),
      role: this.cookie.get('role'),
      _accessToken: this.cookie.get('accessToken'),
      _tokenExpiration: this.cookie.get('expiresIn')
    };

    if (!userData) {
      return;
    }

    const loadedUser = {
      data: {
        me: {
          id: userData.id,
          fullName: userData.fullName,
          role: userData.role,
          __typename: 'User'
        }
      }
    };

    if (userData._accessToken) {
      this.setState({ currentUser: loadedUser }, 'AUTO_LOGIN');

      const expirationDuration =
        new Date(userData._tokenExpiration).getTime() -
        new Date().getTime();

      // this.autoLogout(expirationDuration);
    }
  }

  logout() {
    return this.apolloSdk.logout()
      .subscribe(res => {
        this.setState({ currentUser: null }, 'LOGOUT');
        this.cookie.deleteAll();
        this.router.navigateByUrl('/home');
      });
  }

  autoLogout(expirationDuration: number) {
    const time  = timer(expirationDuration * 150000);
    time.subscribe(() => this.logout());
  }

  handleAuthentication(
    userData: {
      id: string,
      fullName: string,
      role: string,
      __typename: 'User'
    },
    tokenData: {
      accessToken: string,
      expiresIn: number
    }) {
    const user = {
      data: {
        me: userData
      }
    };
    this.setState({ currentUser: user }, 'LOGIN');
    this.cookie.set('id', userData.id);
    this.cookie.set('fullName', userData.fullName);
    this.cookie.set('role', userData.role);
    this.cookie.set('accessToken', tokenData.accessToken);
    this.cookie.set('expiresIn', tokenData.expiresIn.toString());

    // this.autoLogout(tokenData.expiresIn);
  }
}
