import { createState, Store, StoreDef } from '@ngneat/elf';
import {
   selectAllEntities,
   setEntities,
   withEntities,
} from '@ngneat/elf-entities';
import { v4 } from 'uuid';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Сидим первоначальные значения, в настоящем проекте эти данные получали бы с бэка
const { state, config } = createState(
   withEntities<User>({
      initialValue: [
         { id: 1, username: 'user1', password: '1111', is_online: true },
         { id: 1, username: 'user2', password: '1111', is_online: true },
         { id: 1, username: 'user3', password: '1111', is_online: true },
         { id: 1, username: 'user4', password: '1111', is_online: true },
      ],
   }),
);

@Injectable()
export class UserRepository {
   constructor(public readonly store: Store<StoreDef<typeof state>>) {}

   /** Все пользователи */
   readonly users$: Observable<User[]> = this.store.pipe(selectAllEntities());

   // Метод, который вызывался бы из файла сервиса, чтобы заполнить стор значениями с бэка
   // Не используется в рамках тестового задания, данные засижены "искуственно"
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

export interface User {
   id: number;
   username: string;
   password: string;
   is_online: boolean;
}
