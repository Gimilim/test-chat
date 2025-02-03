import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserProvider, UserRepository } from './t-users.repository';
import { PushPipe } from '@ngrx/component';

@Component({
   selector: 'app-t-users',
   standalone: true,
   imports: [PushPipe],
   templateUrl: './t-users.component.html',
   styleUrl: './t-users.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [UserProvider],
})
export class TUsersComponent {
   private readonly userRepo = inject(UserRepository);

   // Получаем всех пользователей
   readonly allUsers$ = this.userRepo.users$;
}
