import {
   ChangeDetectionStrategy,
   Component,
   inject,
   OnInit,
} from '@angular/core';
import { UserProvider, UserRepository } from './t-users.repository';
import { PushPipe } from '@ngrx/component';
import { UserService } from '../../state/users/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
   selector: 'app-t-users',
   standalone: true,
   imports: [PushPipe],
   templateUrl: './t-users.component.html',
   styleUrl: './t-users.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [UserProvider, UserService],
})
export class TUsersComponent implements OnInit {
   private readonly userRepo = inject(UserRepository);
   private readonly userService = inject(UserService);

   // Все пользователи
   readonly allUsers$ = this.userRepo.users$;

   ngOnInit(): void {
      // Подгружаем всех пользователей
      this.userService.getAllUsers().pipe(untilDestroyed(this)).subscribe();

      this.allUsers$.pipe(tap((x) => console.log(x))).subscribe();
   }
}
