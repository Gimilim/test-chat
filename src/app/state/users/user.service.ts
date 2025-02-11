import { inject, Injectable } from '@angular/core';
import { UserService as UserSwaggerService } from '../../services/codegen/api/user.service';
import { Observable, tap } from 'rxjs';
import { User } from '../../services/codegen/model/GetAllUsersQueryResult';
import { UserRepository } from '../../components/mainform/t-users/t-users.repository';
import { LoginControl } from '../../components/login/login.component';
import { Md5 } from 'ts-md5';

@Injectable()
export class UserService {
   private readonly userSwaggerService = inject(UserSwaggerService);
   private readonly userRepo = inject(UserRepository);

   getAllUsers(): Observable<User[]> {
      return this.userSwaggerService
         .getUsers()
         .pipe(tap((response) => this.userRepo.setUsers(response)));
   }

   login(loginData: LoginControl) {
      const md5 = new Md5();
      loginData.password = md5.appendStr(loginData.password).end().toString();

      this.userSwaggerService.login(loginData);
   }
}
