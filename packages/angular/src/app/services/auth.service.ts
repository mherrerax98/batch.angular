import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

export interface IUser {
  email: string;
  name?: string;
  avatarUrl?: string;
}

export interface IResponse {
  isOk: boolean;
  data?: IUser;
  message?: string;
}

const defaultPath = '/';
export const defaultUser: IUser = {
  email: 'jheart@dx-email.com',
  name: 'John Heart',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/01.png',
};

@Injectable()
export class AuthService {
  private _user: IUser | null = defaultUser;

  get loggedIn(): boolean {
    return !!this._user;
  }

  private _lastAuthenticatedPath: string = defaultPath;

  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router) { }

  async logIn(email: string, password: string) {
    try {
      // Send request
      this._user = { ...defaultUser, email };
      this.router.navigate([this._lastAuthenticatedPath]);

      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
        message: 'Authentication failed',
      };
    }
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
        data: null,
      };
    }
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request

      this.router.navigate(['/auth/create-account']);
      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to create account',
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to change password',
      };
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to reset password',
      };
    }
  }

  async logOut() {
    this.router.navigate(['/auth/login']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode',
    ].includes(route.routeConfig?.path || defaultPath);

    if (!isLoggedIn && !isAuthForm) {
      // Si el usuario no está autenticado y la ruta no es una ruta de autenticación,
      // lo redirigimos al componente de inicio de sesión
      this.router.navigate(['/auth/login']);
      return false; // Evitamos que acceda a la ruta no autorizada
    }

    if (isLoggedIn && isAuthForm) {
      // Si el usuario está autenticado y está intentando acceder a una ruta de autenticación,
      // lo redirigimos a la ruta principal después de iniciar sesión
      this.router.navigate(['']); // Redirigir a la ruta principal que contiene SideNavOuterToolbarComponent
      return false; // Evitamos que acceda a la ruta de autenticación
    }

    // Si el usuario está autenticado y no está intentando acceder a una ruta de autenticación,
    // permitimos que acceda a la ruta
    return isLoggedIn || isAuthForm;
  }
}
