import { createState, Store, StoreDef } from '@ngneat/elf';
import {
   selectAllEntities,
   setEntities,
   withEntities,
} from '@ngneat/elf-entities';
import { v4 } from 'uuid';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
   GetAllUsersQueryResult,
   User,
} from '../../services/codegen/model/GetAllUsersQueryResult';

const { state, config } = createState(withEntities<User>());

@Injectable()
export class UserRepository {
   constructor(public readonly store: Store<StoreDef<typeof state>>) {}

   /** Все пользователи */
   readonly users$: Observable<User[]> = this.store.pipe(selectAllEntities());

   /** Заполнить пользователей */
   setUsers(users: User[]): void {
      this.store.update(setEntities(users));
   }
}

export const UserProvider = {
   provide: UserRepository,
   useFactory(): UserRepository {
      return new UserRepository(
         new Store({
            name: `user-repository-${v4()}`,
            state,
            config,
         }),
      );
   },
};
