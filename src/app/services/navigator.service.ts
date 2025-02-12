import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalRoutes, RelativePaths } from '../helpers/globals';

@Injectable({ providedIn: 'root' })
export class NavigatorService {
   private readonly router = inject(Router);

   go(url: string) {
      return this.router.navigateByUrl(url);
   }

   goMainForm(): void {
      const url = this.router
         .createUrlTree([GlobalRoutes['ROOT'], RelativePaths['MAIN']])
         .toString();

      this.go(url);
   }

   goLogin(): void {
      const url = this.router
         .createUrlTree([GlobalRoutes['ROOT'], RelativePaths['LOGIN']])
         .toString();

      this.go(url);
   }
}
