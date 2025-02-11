import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserRepository } from '../t-users/t-users.repository';
import { PushPipe } from '@ngrx/component';

@Component({
   selector: 'app-t-user-info',
   standalone: true,
   imports: [PushPipe],
   templateUrl: './t-user-info.component.html',
   styleUrl: './t-user-info.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TUserInfoComponent {
   private readonly userRepo = inject(UserRepository);

   readonly currentUserId = this.userRepo.currentUserId;
   readonly userNameById$ = this.userRepo.userNameById$;
}
