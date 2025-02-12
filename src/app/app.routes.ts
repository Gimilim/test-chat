import { Routes } from '@angular/router';
import { MainformComponent } from './components/mainform/mainform.component';
import { LoginComponent } from './components/login/login.component';
import { hasRoutePermission } from './guards/permission.guard';

export const routes: Routes = [
   {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full',
   },
   {
      path: 'main',
      component: MainformComponent,
      canActivate: [hasRoutePermission],
   },
   {
      path: 'login',
      component: LoginComponent,
   },
];
