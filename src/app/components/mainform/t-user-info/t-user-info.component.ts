import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserRepository } from '../t-users/t-users.repository';
import { PushPipe } from '@ngrx/component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NavigatorService } from '../../../services/navigator.service';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';

@Component({
   selector: 'app-t-user-info',
   standalone: true,
   imports: [PushPipe, NzButtonComponent, NzRowDirective, NzColDirective],
   templateUrl: './t-user-info.component.html',
   styleUrl: './t-user-info.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TUserInfoComponent {
   private readonly userRepo = inject(UserRepository);
   private readonly navigator = inject(NavigatorService);

   readonly currentUserId = this.userRepo.currentUserId;
   readonly userNameById$ = this.userRepo.userNameById$;

   onLogOut() {
      this.userRepo.setCurrentUserId(null);

      this.navigator.goLogin();
   }
}
