import { inject, Injectable } from '@angular/core';
import { UserService as UserSwaggerService } from '../../services/codegen/api/user.service';
import { Observable, tap } from 'rxjs';
import { User } from '../../services/codegen/model/GetAllUsersQueryResult';
import { UserRepository } from '../../components/t-users/t-users.repository';

@Injectable()
export class UserService {
   private readonly userSwaggerService = inject(UserSwaggerService);
   private readonly userRepo = inject(UserRepository);

   getAllUsers(): Observable<User[]> {
      return this.userSwaggerService
         .getUsers()
         .pipe(tap((response) => this.userRepo.setUsers(response)));
   }
}
