import { Component, HostBinding, OnDestroy } from '@angular/core';
import {
  AppInfoService,
  AuthService,
  ScreenService,
  ThemeService,
} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
 

  signin: boolean = false;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private screen: ScreenService,
    public appInfo: AppInfoService
  ) {
    themeService.setAppTheme();
  }

  isAuthenticated() {
    return this.authService.loggedIn;
  }

  ngOnDestroy(): void {
    this.screen.breakpointSubscription.unsubscribe();
  }

  handleOnSignInChange(signIn: boolean) {
    this.signin = signIn;
  }
}
