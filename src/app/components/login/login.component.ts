import {
   ChangeDetectionStrategy,
   Component,
   inject,
   OnInit,
} from '@angular/core';
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { User } from '../../services/codegen/model/GetAllUsersQueryResult';
import {
   NzFormControlComponent,
   NzFormDirective,
   NzFormItemComponent,
   NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { UserService } from '../../state/users/user.service';
import { UserRepository } from '../mainform/t-users/t-users.repository';
import { UserService as UserSwaggerService } from '../../services/codegen/api/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, tap } from 'rxjs';
import { NavigatorService } from '../../services/navigator.service';

@UntilDestroy()
@Component({
   selector: 'app-login',
   standalone: true,
   imports: [
      NzFormDirective,
      ReactiveFormsModule,
      NzFormItemComponent,
      NzFormLabelComponent,
      NzFormControlComponent,
      NzInputGroupComponent,
      NzInputDirective,
      NzButtonComponent,
   ],
   templateUrl: './login.component.html',
   styleUrl: './login.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
   form: FormGroup<ControlsOf<LoginControl>>;

   private readonly userService = inject(UserService);
   private readonly userRepo = inject(UserRepository);
   private readonly userSwaggerService = inject(UserSwaggerService);
   private readonly navigator = inject(NavigatorService);

   ngOnInit(): void {
      this.initForm();
   }

   initForm(): void {
      this.form = new FormGroup<ControlsOf<LoginControl>>({
         username: new FormControl(undefined as string, [Validators.required]),
         password: new FormControl(undefined as string, [Validators.required]),
      });
   }

   onLogin(): void {
      this.userService.login(this.form.getRawValue());

      this.userSwaggerService
         .login(this.form.getRawValue())
         .pipe(
            tap((response) => {
               if (!response.length) {
                  throw new Error('Wrong username or password');
               }
            }),
            map(([response]) => this.userRepo.setCurrentUserId(response.id)),
            tap(() => this.navigator.goMainForm()),
            untilDestroyed(this),
         )
         .subscribe();
   }
}

export interface LoginControl extends Omit<User, 'id' | 'isOnline'> {}
