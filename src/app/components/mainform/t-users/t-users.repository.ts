import { createState, select, Store, StoreDef, withProps } from '@ngneat/elf';
import {
   selectAllEntities,
   selectEntity,
   setEntities,
   withEntities,
} from '@ngneat/elf-entities';
import { v4 } from 'uuid';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../services/codegen/model/GetAllUsersQueryResult';

export interface UsersProps {
   currentUserId: User['id'];
}
const { state, config } = createState(
   withEntities<User>(),
   withProps<UsersProps>({ currentUserId: undefined }),
);

@Injectable()
export class UserRepository {
   constructor(public readonly store: Store<StoreDef<typeof state>>) {}

   /** Все пользователи */
   readonly users$: Observable<User[]> = this.store.pipe(selectAllEntities());

   /** ИД текущего пользователя */
   readonly currentUserId$ = this.store.pipe(select((st) => st.currentUserId));

   /** Заполнить пользователей */
   setUsers(users: User[]): void {
      this.store.update(setEntities(users));
   }

   /** Пользователь по ИД */
   readonly userById$ = (id: User['id']) => this.store.pipe(selectEntity(id));

   /** Имя пользователя по ИД */
   readonly userNameById$ = (id: User['id']) =>
      this.userById$(id).pipe(map((x) => x?.username));
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
