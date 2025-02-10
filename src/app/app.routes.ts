import { Routes } from '@angular/router';
import { MainformComponent } from './components/mainform/mainform.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
   {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full',
   },
   {
      path: 'main',
      component: MainformComponent,
   },
   {
      path: 'login',
      component: LoginComponent,
   },
   // {
   //   path: 'user',
   //   component: ,
   //   canActivate: [],
   //   canActivate: [true]
   // },
];
