import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { NavigatorService } from '../services/navigator.service';
import { UserRepository } from '../components/mainform/t-users/t-users.repository';

export const hasRoutePermission: CanActivateFn = () => {
   const navigator = inject(NavigatorService);
   const userRepo = inject(UserRepository);

   if (userRepo.currentUserId) {
      return true;
   } else {
      navigator.goLogin();
   }
   return false;
};
