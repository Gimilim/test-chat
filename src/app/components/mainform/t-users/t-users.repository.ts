import { createState, select, setProp, Store, withProps } from '@ngneat/elf';
import {
   selectAllEntities,
   selectEntity,
   setEntities,
   withEntities,
} from '@ngneat/elf-entities';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../../services/codegen/model/GetAllUsersQueryResult';

export interface UsersProps {
   currentUserId: User['id'];
}

const { state, config } = createState(
   withEntities<User>(),
   withProps<UsersProps>({ currentUserId: null }),
);

const store = new Store({ name: 'user-repository', state, config });

@Injectable({ providedIn: 'root' })
export class UserRepository {
   /** Все пользователи */
   readonly users$: Observable<User[]> = store.pipe(selectAllEntities());

   /** ИД текущего пользователя */
   readonly currentUserId$ = store.pipe(select((st) => st.currentUserId));

   /** Установить текущего пользователя */
   setCurrentUserId(id: User['id']): void {
      store.update(setProp('currentUserId', id));
   }

   /** Заполнить пользователей */
   setUsers(users: User[]): void {
      store.update(setEntities(users));
   }

   /** Пользователь по ИД */
   readonly userById$ = (id: User['id']) => store.pipe(selectEntity(id));

   /** Имя пользователя по ИД */
   readonly userNameById$ = (id: User['id']) =>
      this.userById$(id).pipe(map((x) => x?.username));

   /** ИД текущего пользователя */
   get currentUserId(): number {
      return store.query((state) => state.currentUserId);
   }
}

// todo подумать с тем, как довавть доступ, скорее всего нужно будет сделать отдельный стор
// @Injectable()
// export class UserRepository {
//    constructor(public readonly store: Store<StoreDef<typeof state>>) {}
//
//    /** Все пользователи */
//    readonly users$: Observable<User[]> = this.store.pipe(selectAllEntities());
//
//    /** ИД текущего пользователя */
//    readonly currentUserId$ = this.store.pipe(select((st) => st.currentUserId));
//
//    /** Установить текущего пользователя */
//    setCurrentUserId(id: User['id']): void {
//       this.store.update(setProp('currentUserId', id));
//    }
//
//    /** Заполнить пользователей */
//    setUsers(users: User[]): void {
//       this.store.update(setEntities(users));
//    }
//
//    /** Пользователь по ИД */
//    readonly userById$ = (id: User['id']) => this.store.pipe(selectEntity(id));
//
//    /** Имя пользователя по ИД */
//    readonly userNameById$ = (id: User['id']) =>
//       this.userById$(id).pipe(map((x) => x?.username));
//
//    /** ИД текущего пользователя */
//    get currentUserId(): number {
//       return this.store.query((state) => state.currentUserId);
//    }
// }
//
// export const UserProvider = {
//    provide: UserRepository,
//    useFactory(): UserRepository {
//       return new UserRepository(
//          new Store({
//             name: `user-repository-${v4()}`,
//             state,
//             config,
//          }),
//       );
//    },
// };
